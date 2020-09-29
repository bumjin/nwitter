import React, { useState } from "react";
import { authService } from "../fbase";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const onChange = (event) => {
        console.log(event.target.name)
        const { target: { name, value } } = event;
        if (name === 'email') {
            setEmail(value);
        } if (name === 'password') {
            setPassword(value)
        }
    }
    const onSubmit = async (event) => {
        //console.log(event.target.name)
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                //create account
                data = await authService.createUserWithEmailAndPassword(email, password)

            } else {
                data = await authService.signInWithEmailAndPassword(email, password)
            }
        } catch (error) {
            setError(error.message);
        }
    }

    const toggleAccount = () => setNewAccount((prev) => !prev)
    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input type="text" name="email" placeholder="Email" required value={email} onChange={onChange} className="authInput"></input>
                <input type="password" name="password" placeholder="Password" required value={password} onChange={onChange} className="authInput"></input>
                <input type="submit" value={newAccount ? "Create New Account" : "Sign In"} className="authInput authSubmit"></input>
                {error && <span className="authError">{error}</span>}
            </form>

            <span onClick={toggleAccount} className="authSwitch">
                {newAccount ? "Sign In" : "Create Account"}
            </span>
        </>
    )
}

export default AuthForm