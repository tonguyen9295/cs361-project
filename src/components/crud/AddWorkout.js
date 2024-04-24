import React from "react";
import Layout from "../layout/layout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// add workout component that allows a user to add a workout
function AddWorkout() {

    // redirect user to React pages
    const navigate = useNavigate();

    // insert a new workout into database
    const [newWorkout, setNewWorkout] = useState({
        workout: "",
        dateOfWorkout: "",
    })

    const handleNewWorkoutData = (newValues) => {
        setNewWorkout((currentValues) => ({ ...currentValues, [newValues.target.name]: newValues.target.value }));
    }

    const submitNewWorkoutData = async (submit) => {
        submit.preventDefault();
        try {
            await axios.post("/create-workout/create", newWorkout);
            navigate("/");
        } catch (err) {
            console.error("Error adding data:", err);
        }
    };

    return (
        <Layout>
            <div>
                <form action="" method="get" className="add-form">
                    <h3>ADD WORKOUT</h3>
                    <div className="form-container">
                        <div className="add-exercise-row">
                            <label for="workout">Name of Workout: </label>
                            <input type="text" name="workout" id="workout" onChange={handleNewWorkoutData} required />
                        </div>
                        <div className="add-exercise-row">
                            <label for="dateOfWorkout">Date of Workout: </label>
                            <input type="text" name="dateOfWorkout" id="dateOfWorkout" placeholder="YEAR/MONTH/DATE" onChange={handleNewWorkoutData} required />
                        </div>
                    </div>
                </form>
                <div className="features-list-container">
                    <button className="home-add-exercise" onClick={submitNewWorkoutData}>SUBMIT</button>
                    <button className="home-cancel-exercise" onClick={() => navigate("/")}>CANCEL</button>
                </div>
            </div>
        </Layout>
    );
}

export default AddWorkout;