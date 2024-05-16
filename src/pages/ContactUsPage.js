import React from "react";
import Layout from "../components/layout/layout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// create contact us page that allows user to request a response from team
function ContactUsPage() {

    // redirect visitor to React pages
    const navigate = useNavigate();

    const [contactUs, setContactUs] = useState({
        userName: "",
        userEmail: "",
        userMessage: "",
    })

    const [haveSubmitted, setHaveSubmitted] = useState(false);
    const [emailValid, setEmailValid] = useState(false);

    const handleContactUsAttributes = (newValues) => {
        setContactUs((currentValues) => ({ ...currentValues, [newValues.target.name]: newValues.target.value }));
    }

    const submitContactUs = async (submit) => {
        submit.preventDefault();
        try {
            const response = await axios.post("http://localhost:3004/contact-us/response", contactUs);
            if (response.data["emailValid"] === 1) {
                setHaveSubmitted(true);
                setEmailValid(true);
                setTimeout(() => navigate("/"), 5000);
            }  else {
                setHaveSubmitted(true);
                setTimeout(() => window.location.reload(), 5000);
            }
        } catch (err) {
            console.error("Error submitting request for response back from team:", err);
        }
    };

    return (
        <Layout>
            <div>
                <div className="random-exercise-generator-description">
                    <h1>
                        Contact Us Page
                    </h1>
                    <p>
                        Please let us know what questions and concerns you have, and we will get back to you as soon as we can to help you!
                    </p>
                    <form action="" method="get" className="add-form">
                        <h3>Complete form to request for a response from our team!!!</h3>
                        <div className="form-container">
                            <div className="add-exercise-row">
                                <label for="userName">Name:  </label>
                                <input type="text" name="userName" id="userName"  onChange={handleContactUsAttributes} required />
                            </div>
                            <div className="add-exercise-row">
                                <label for="userEmail">Email:  </label>
                                <input type="text" name="userEmail" id="userEmail"  onChange={handleContactUsAttributes} required />
                            </div>
                            <div className="add-exercise-row">
                                <label for="userMessage">Message:  </label>
                                <input type="text" name="userMessage" id="userMessage"  onChange={handleContactUsAttributes} required />
                            </div>
                        </div>
                    </form>
                    <div>
                        {haveSubmitted ? 
                            <div>
                                {emailValid ? 
                                <div>
                                    <h4>Success!</h4>
                                    <p>Your request for assistance was successfully sent to our team!</p>
                                    <p>We will get back to you at your email address {contactUs["userEmail"]} in 24-48 hours.</p>
                                    <p>Redirecting you to the main home page in a few seconds!</p>
                                </div> : 
                                <div>
                                    <h4>We are Sorry!</h4>
                                    <p>The email address {contactUs["userEmail"]} is not valid!</p>
                                    <p>Once you provide a valid email address, then your request for assistance will be properly sent to us!</p>
                                    <p>Refreshing the page for you to enter your information again!</p>
                                </div>
                                }
                            </div> :
                            <div>
                            </div>
                        }
                    </div>
                </div>
                <div className="features-list-container">
                    <button className="home-add-exercise"  onClick={submitContactUs}>SUBMIT</button>
                    <button className="home-cancel-exercise" onClick={() => navigate(`/help-page`)}>GO BACK TO HELP PAGE</button>
                </div>
            </div>
        </Layout>
    );
}

export default ContactUsPage;