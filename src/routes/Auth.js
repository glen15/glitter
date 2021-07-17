import { authService } from "fbase";
import React, { useState } from "react";

 const Auth = () => {
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
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}/>
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
                <input type="submit" value={newAccount ? "Create Account" : "Sign in"} />
                {error}
            </form>
            <span onClick={toogleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
            <div> 
                <button>Continue with Google</button>
                <button>Continue with GitHub</button>
            </div>
        </div>
     )
 }
 export default Auth;
//  자동으로 import 되도록하고싶을때 위에처럼


// 원래는 밑에꺼였음
//export default () => <span>Auth</span>;