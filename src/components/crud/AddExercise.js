import React from "react";
import Layout from "../layout/layout";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// create exercise component that allows a user to add an exercise to a workout
function AddExercise() {

    // redirect visitor to React pages
    const navigate = useNavigate();

    // insert an exercise to a workout in database
    const urlLocation = useLocation();
    const specificworkout = urlLocation.pathname.split("/")[2];

    const [setExercise, setNewExercise] = useState({
        sessionExercises: "",
        sets: "",
        repetitions: "",
        weight: "",
        workout: specificworkout,
    })

    const handleNewExerciseData = (newValues) => {
        setNewExercise((currentValues) => ({ ...currentValues, [newValues.target.name]: newValues.target.value }));
    }

    const submitNewExerciseData = async (submit) => {
        submit.preventDefault();
        try {
            await axios.post(`/add-exercise/${specificworkout}`, setExercise);
            navigate(`/exercise-page/${specificworkout}`);
        } catch (err) {
            console.error("Error adding data:", err);
        }
    };

    return (
        <Layout>
            <div>
                <form action="" method="get" className="add-form">
                    <h3>ADD EXERCISE</h3>
                    <div className="form-container">
                        <div className="add-exercise-row">
                            <label for="sessionExercises">Name of Exercise: </label>
                            <input type="text" name="sessionExercises" id="sessionExercises"  onChange={handleNewExerciseData} required />
                        </div>
                        <div className="add-exercise-row">
                            <label for="sets">Number of Sets: </label>
                            <input type="text" name="sets" id="sets"  onChange={handleNewExerciseData} required />
                        </div>
                        <div className="add-exercise-row">
                            <label for="repetitions">Number of Repetitions: </label>
                            <input type="text" name="repetitions" id="repetitions"  onChange={handleNewExerciseData} required />
                        </div>
                        <div className="add-exercise-row">
                            <label for="weight">Weight (lbs): </label>
                            <input type="text" name="weight" id="weight"  onChange={handleNewExerciseData} required />
                        </div>
                    </div>
                </form>
                <div className="features-list-container">
                    <button className="home-add-exercise"  onClick={submitNewExerciseData}>SUBMIT</button>
                    <button className="home-cancel-exercise" onClick={() => navigate(`/exercise-page/${specificworkout}`)}>CANCEL</button>
                </div>
            </div>
        </Layout>
    );
}

export default AddExercise;