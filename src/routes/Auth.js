import { authService } from "fbase";
import React, { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const toggleAccount = () => setNewAccount((prev) => !prev)
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
    return (<div>
        <form onSubmit={onSubmit}>
            <input type="text" name="email" placeholder="Email" required value={email} onChange={onChange}></input>
            <input type="password" name="password" placeholder="Password" required value={password} onChange={onChange}></input>
            <input type="submit" value={newAccount ? "Create New Account" : "Sign In"}></input>
            {error}
        </form>
        <div>
            <button>Continue With Google</button>
            <button>Continue With GitHub</button>
        </div>
        <span onClick={toggleAccount}>
            {newAccount ? "Sign In" : "Create Account"}
        </span>
    </div>)
}

export default Auth;