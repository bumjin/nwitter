import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";
import AuthForm from "components/AuthForm"
const Auth = () => {
    const onSocialClick = async (event) => {
        const { target: { name } } = event;
        let provider
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
            //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }

        const data = await authService.signInWithPopup(provider);
    }

    return (<div>
        <AuthForm></AuthForm>
        <div>
            <button onClick={onSocialClick} name="google">Continue With Google</button>
            <button onClick={onSocialClick} name="github">Continue With GitHub</button>
        </div>

    </div>)
}

export default Auth;