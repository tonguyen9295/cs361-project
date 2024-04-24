import React from "react";
import Layout from "../components/layout/layout";
import { useNavigate, Link } from "react-router-dom";

// create help page to show visitors in how to use the website
function HelpPage() {

    // use to navigate React pages
    const navigate = useNavigate();

    return (
        <Layout>
            <div>
                <h1 className="page-title-container">Help Page</h1>
                <h3>What are you needing help with?</h3>
                <div className="help-page-order-list">
                    <ol>
                        <li>
                            <Link to="/under-construction" className="fancy-help-links">Learn how to create a new workout session</Link>
                        </li>
                        <li>
                            <Link to="/under-construction" className="fancy-help-links">Learn how to update a new workout session</Link>
                        </li>
                        <li>
                            <Link to="/under-construction" className="fancy-help-links">Learn how to delete a workout session</Link>
                        </li>
                        <li>
                            <Link to="/under-construction" className="fancy-help-links">Learn how to add an exercise</Link>
                        </li>
                    </ol>
                </div>
                <div className="features-list-container">
                    <div>
                        <button className="home-add-exercise" onClick={() => navigate("/")}>Go Back Home</button>
                    </div>
                    <div>
                        <button className="home-cancel-exercise" onClick={() => navigate("/under-construction")}>Need More Help?</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default HelpPage;