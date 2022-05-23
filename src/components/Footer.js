import React from "react";
import "./Footer.css";

function Footer() {
    //use this on the home page 
    return (
        <div className="footer">
            <footer className="bg-light text-center text-lg-start">
                <div className="text-center+ p-3" id="footerDesc">
                    Made By: Anshul Shah, Kevin Mao, and Yi-Fei Zhao
                    <br />
                    Photo by {" "}
                    <a href="https://unsplash.com/@adoucett?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText%22%3E">
                        Aaron Doucett 
                    </a> 
                    {" "} on {" "}
                    <a href="https://unsplash.com/s/photos/food-bank?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText%22%3E">
                        Unsplash
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
