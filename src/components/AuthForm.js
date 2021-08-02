import { authService } from "fbase";
import React, {useState} from "react";

const AuthFrom = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
     
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if (name === "email"){
            setEmail(value)
        } else if (name === "password"){
            setPassword(value)
        }
    }
    const onSubmit = async(event) => {
        event.preventDefault(); // 이거 안하면, 로그인버튼 누를때마다 새로고침되고, email password에 적용한 리액트기능이 다 사라진다
        //preventDefault() : 기본행위가 실행되는것 막기
        try {
            let data
           if(newAccount){
               data = await authService.createUserWithEmailAndPassword(
                   email, password
               );
           } else {
               data = await authService.signInWithEmailAndPassword(
                   email, password
               );
           }
           console.log(data)
        } catch(error) {
           setError(error.message)
        }
    };
    const toogleAccount = () => setNewAccount(prev => !prev);
    return (
    <>
        <form onSubmit={onSubmit} className="container">
            <input name="email" 
                type="email" 
                placeholder="Email" 
                required 
                value={email} 
                onChange={onChange}
                className="authInput"
            />
            <input name="password" 
                type="password" 
                placeholder="Password" 
                required 
                value={password} 
                onChange={onChange}
                className="authInput"
            />
            <input type="submit"
                className="authInput authSubmit"
                value={newAccount ? "Create Account" : "Sign in"}
            />
            {error && <span className="authError">{error}</span>}
        </form>
            <span onClick={toogleAccount} className="authSwitch">
                {newAccount ? "Sign In" : "Create Account"}
            </span>
    </>
    )
}

export default AuthFrom;