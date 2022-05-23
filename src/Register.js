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
import { auth, userRegistration } from "./firebase";
import "./Register.css";

function Register() {
    //initializes state variables to be used
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    //Creates an instance of the current user - you can get their uid and name from this
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    //on render of this component check if there is 
    //a user signed in, if so navigate to their account page
    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) navigate("/account");
    });

    return (
        <div className="register">
            <h2>Register</h2>
            {/*Input for Name*/}
            <div class="mb-2 mt-2">
                <input
                    class="form-control"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
            </div>
            {/*Input for email*/}
            <div class="mb-2 mt-2">
                <input
                    class="form-control"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                />
            </div>
            {/*Input for Password*/}
            <div class="mb-2 mt-2">
                <input
                    class="form-control"
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
            </div>
            {/*Create account with the name email and password inputed*/}
            <button
                onClick={() => userRegistration(name, email, password)}
                id="login_button"
                class="btn btn-outline-primary"
            >
                Sign Up
            </button>
            {/*Link to login page*/}
            <div>
                Already have an account? {" "}
                <Link className="link" to="/login">
                    Log In
                </Link> {" "}
                now.
            </div>
        </div>
    );
}

export default Register;
