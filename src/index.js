import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";
/*
Bootstrap
Description: Open Source Code 
Author / Owner (s): Bootstrap Authors and Twitter 
Usage: CSS throughout the website 
Online Download Link: https://getbootstrap.com/
Other Information: Free to use under MIT License: https://opensource.org/licenses/MIT
Creative Commons Site: https://creativecommons.org/licenses/by/3.0/
*/

//Configures app
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
