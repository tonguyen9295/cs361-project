import React from "react";
import brandLogo from './logo-no-background.png';
import helpLogo from './logo-question-mark.png'
import { useNavigate } from "react-router-dom";

// create navigation bar for users to navigate back to main page or to help page
function Navbar() {

    // navigate to redirect users to other pages of web app
    const navigate = useNavigate();

    return (
        <div className="navbar">
            <img src={brandLogo} alt="" className="navbar-brand-logo" onClick={() => navigate("/")}/>
            <img src={helpLogo} alt="" className="navbar-help-logo" onClick={() => navigate("/help-page")}/>
        </div>
    );
}

export default Navbar;