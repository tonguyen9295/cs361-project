import React, { useEffect } from "react";
import Layout from "../layout/layout";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function UpdateExercise() {
    const goBackToExercisePage = useNavigate();

    const [exerciseAttributes, setExerciseAttributes] = useState({
        exerciseName: "",
        exerciseSets: "",
        exerciseRepetitions: "",
        exerciseWeight: "",
    });

    const urlLocation = useLocation();
    const specificWorkout = urlLocation.pathname.split("/")[2];
    const sessionexercise = urlLocation.pathname.split("/")[3];

    useEffect(() => {
        fetchExerciseAttributes();
    }, []);

    const fetchExerciseAttributes = async () => {
        try {
            const response = await axios.get(`http://localhost:3003/get-exercise-data/${specificWorkout}/${sessionexercise}`);
            const data = response.data;
            setExerciseAttributes({
                exerciseName: data[0].sessionExercises,
                exerciseSets: data[0].sets,
                exerciseRepetitions: data[0].repetitions,
                exerciseWeight: data[0].weight,
            })
        } catch (err) {
            console.error("Error fetching specific exercise data:", err);
        }
    };

    const updateFormValues = (enteredValues) => {
        setExerciseAttributes((currentAttributes) => ({ ...currentAttributes, [enteredValues.target.name]: enteredValues.target.value }))
    }

    const handleSubmissionOfUpdate = async (submit) => {
        submit.preventDefault();
        try {
            await axios.put(`http://localhost:3003/update-exercise/${specificWorkout}/${sessionexercise}`, exerciseAttributes);
            goBackToExercisePage(`/exercise-page/${specificWorkout}`);
        } catch (err) {
            console.error("Failed to update exercise:", err);
        }
    };

return (
    <div>
      <form action="" method="get" className="add-form">
        <h3>Update Exercise</h3>
        <div className="form-container">
            <div className="add-exercise-row">
                <label for="exerciseName">Name:  </label>
                <input type="text" name="exerciseName" id="exerciseName" value={exerciseAttributes.exerciseName} onChange={updateFormValues} />
            </div>
        </div>
        <div className="form-container">
            <div className="add-exercise-row">
                <label for="exerciseSets">Sets:  </label>
                <input type="text" name="exerciseSets" id="exerciseSets" value={exerciseAttributes.exerciseSets} onChange={updateFormValues} />
            </div>
        </div>
        <div className="form-container">
            <div className="add-exercise-row">
                <label for="exerciseRepetitions">Repetitions:  </label>
                <input type="text" name="exerciseRepetitions" id="exerciseRepetitions" value={exerciseAttributes.exerciseRepetitions} onChange={updateFormValues} />
            </div>
        </div>
        <div className="form-container">
            <div className="add-exercise-row">
                <label for="exerciseWeight">Weight:  </label>
                <input type="text" name="exerciseWeight" id="exerciseWeight" value={exerciseAttributes.exerciseWeight} onChange={updateFormValues} />
            </div>
        </div>
      </form>
      <div className="features-list-container">
            <button className="home-add-exercise"  onClick={handleSubmissionOfUpdate}>SUBMIT</button>
            <button className="home-cancel-exercise" onClick={() => goBackToExercisePage(`/exercise-page/${specificWorkout}`)}>CANCEL</button>
        </div>
    </div>
  );
};

export default UpdateExercise