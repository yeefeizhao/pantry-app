import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
/*
Firebase Hook 
Description: Open Source Code package on NPM
Author / Owner (s): Chris Bianca
Usage: Used for user authentication  
Online Download Link: https://www.npmjs.com/package/react-firebase-hooks
Other Information: License: https://github.com/csfrequency/react-firebase-hooks/blob/HEAD/LICENSE
*/
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "./firebase";
import "./Login.css";

function Login() {
    //initializes state variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    //runs on component load, if user is logged in, redirect to
    //account page
    useEffect(() => {
        if (user) navigate("/account");
    });

    return (
        <div className="login">
            <h2>Login</h2>
            {/*Email address and password inputs*/}
            <div className="mb-2 mt-2">
                <input
                    className="form-control"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                />
            </div>
            <div className="mb-2">
                <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
            </div>
            {/*Submit button and register/forgot links*/}
            <button
                onClick={() => signInWithEmailAndPassword(email, password)}
                id="login_button"
                className="btn btn-outline-primary"
            >
                Log In
            </button>
            <div>
                Don't have an account? {" "}
                <Link className="link" to="/register">
                    Register
                </Link> {""}
                now.
            </div>
            <div>
                <Link className="link" to="/reset">
                    Forgot Password?
                </Link>
            </div>
        </div>
    );
}

export default Login;
