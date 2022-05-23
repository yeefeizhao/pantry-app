import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword } from "./firebase";
import "./Reset.css";

function Reset() {
    //initializes email and navigate objects
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    //uses firebase's builtin reset password function on the email
    //and takes user back to login page
    const reset = (email) => {
        resetPassword(email);
        navigate("/login");
    };

    return (
        <div className="reset">
            <h2>Account Recovery</h2>
            {/*Form for entering email*/}
            <div class="mb-2 mt-2">
                <input
                    class="form-control"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
            </div>
            {/*Button to call the reset function*/}
            <button 
                onClick={() => reset(email)}
                id="login_button"
                class="btn btn-outline-primary"
            >
                Send Password Reset Email
            </button>
            {/* registration link */}
            <div>
                Don't have an account? {" "}
                <Link className="link" to="/register">
                    Register
                </Link> {" "}
                now.
            </div>
        </div>
    );
}

export default Reset;
