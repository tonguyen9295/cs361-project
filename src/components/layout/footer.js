import React from "react";
import "./layout.css";

// create footer that shows copyright information for web app
function Footer () {
    return (
        <div>
            <div className="footer">
                &copy; {new Date().getFullYear()} CS 361 Project - Tony Nguyen
            </div>
        </div>
    );
}

export default Footer;