import React from "react";
import Layout from "../components/layout/layout";
import { useNavigate } from "react-router-dom";

// create under construction page to show visitors pages that are not currently available for peruse
function UnderConstruction () {

    // use to navigate React pages
    const navigate = useNavigate();
    
    return (
        <Layout>
            <div>
                <h1>Oops...</h1>
                <p>Page is currently under construction</p>
                <p>In the meantime, please enjoy browsing other parts of the site.</p>
                <div className="button-container">
                    <button className="home-add-workout" onClick={() => {navigate("/")}}>GO BACK HOME</button>
                </div>
            </div>
        </Layout>
    );
}

export default UnderConstruction;