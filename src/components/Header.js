import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import "./Header.css";
import { useAuthState } from "react-firebase-hooks/auth";
/*
Firebase Hook 
Description: Open Source Code package on NPM
Author / Owner (s): Chris Bianca
Usage: Used for user authentication  
Online Download Link: https://www.npmjs.com/package/react-firebase-hooks
Other Information: License: https://github.com/csfrequency/react-firebase-hooks/blob/HEAD/LICENSE
*/

function Header() {
    //creates an instance of the current user - you can get their uid and name from this
    const [user] = useAuthState(auth);

    return (
        <div id="scanfcode" className="header">
            <nav className="navbar fixed-top navbar-expand-lg px-4 pt-2">
                <div className="container-fluid">
                    <Link
                        id="title"
                        className="navbar-brand mb-0 ml-3 h1 pt-2"
                        to="/"
                    >
                        Donamus
                    </Link>
                    {/* button for responsive design Contracts to a dropdown if the screen size becomes to small */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link
                                    className="nav-link active px-3 pt-3"
                                    aria-current="page"
                                    to="/banks"
                                >
                                    Request Listings
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link active px-3 pt-3"
                                    aria-current="page"
                                    to="/map"
                                >
                                    Map
                                </Link>
                            </li>
                        </ul>
                        <div className="form-inline px-3">
                            {/* 
                                if user is logged in, change the button text to account
                                if no user, change the button text to login
                                the destination of the link will also change accordingly
                            */}
                            <Link
                                id="logbut"
                                className="btn my-2 my-sm-0 px-3"
                                type="button"
                                to={user ? "/account" : "/login"}
                            >
                                {user ? "Account" : "Login"}
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
