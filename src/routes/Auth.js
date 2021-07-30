import React from "react";
import { authService, firebaseInstance } from "fbase";
import AuthForm from "components/AuthForm"

 const Auth = () => {
     const onSocialClick = async (event) => {
        const {target:{name}} = event;
        let provider; //social login 을 위한 장치 반드시 필요
        if(name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
     };
     return (
        <div>
            <AuthForm />
            <div> 
                <button name="google" onClick={onSocialClick}>
                    Continue with Google
                </button>
                <button name="github" onClick={onSocialClick}>
                    Continue with GitHub
                </button>
            </div>
        </div>
     )
 }
 export default Auth;
//  자동으로 import 되도록하고싶을때 위에처럼


// 원래는 밑에꺼였음
//export default () => <span>Auth</span>;