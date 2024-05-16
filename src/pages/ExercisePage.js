import React from "react";
import Layout from "../components/layout/layout";
import { Link, useNavigate, useLocation, redirect } from "react-router-dom";
import { RxBorderSolid, RxPencil2 } from "react-icons/rx";
import { useState, useEffect } from "react";
import axios from "axios";
import { SearchDropdown } from '../components/crud/exerciseByMuscle';

// create exercise page that shows list of exercises for a workout
function ExercisePage() {

    // use to navigate React pages
    const navigate = useNavigate();

    // get list of exercises for a workout
    const [data, setData] = useState([]);

    const urlLocation = useLocation();
    const specificworkout = urlLocation.pathname.split("/")[2];

    useEffect(() => {  
        fetchExercises(); 
    }, []);

    const fetchExercises = async () => {
        try {
            const response = await axios.get(`/exercise-page/data/${specificworkout}`);   
            setData(response.data);  
        } catch (err) {
            console.error('Error fetching exercises from MySQL database:', err);
        }
    };

    // delete an exercise for a workout
    const deleteData = async (exercise) => {
        try {
            await axios.delete(`/exercise-page/data/${specificworkout}/${exercise}`);
            window.location.assign(`/exercise-page/${specificworkout}`);
        } catch (err) {
            console.error("Failed to delete an exercise from MySQL database:", err);
        }
    };

    // get random exercise by muscle
    const [renderMuscleExerciseGroup, setRenderMuscleExerciseGroup] = useState(false);
    const [muscleExerciseGroup, setMuscleGroup] = useState([]);
    const handleMuscleGroup = async (muscleGroup) => {
        try {
            const response = await axios.get(`http://localhost:3002/exercise/${muscleGroup}`);
            setMuscleGroup(response.data);
            setRenderMuscleExerciseGroup(true);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    return (
        <Layout>
            <div>
                <h1 className="page-title-container">List of Exercises Page</h1>
                <div className="table-container">
                    <div className="table-style">
                        <table>
                            <thead>
                                <tr>
                                    <th>Exercise</th>
                                    <th>Sets</th>
                                    <th>Repetitions</th>
                                    <th>Weight (lbs)</th>
                                    <th>Specific Workout Session</th>
                                    <th>Delete</th>
                                    <th>Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <th>{item.sessionExercises}</th>
                                        <th>{item.sets}</th>
                                        <th>{item.repetitions}</th>
                                        <th>{item.weight}</th>
                                        <th>{item.workout}</th>
                                        <th><RxBorderSolid onClick={() => 
                                            {
                                            if (window.confirm('Are you SURE you want to delete this exercise? This action is IRREVERSIBLE!')) 
                                                deleteData(item.sessionExercises);
                                            } 
                                            }/></th>
                                        <th><Link to={`/update-exercise/${item.workout}/${item.sessionExercises}`}><RxPencil2/></Link></th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="random-exercise-generator-description">
                    <div>
                        <h4>
                            Random Exercise Generator
                        </h4>
                        <p>
                            Choose a muscle to randomly generate an exercise for workout inspiration!
                        </p>
                        <SearchDropdown onSelect={handleMuscleGroup}/>
                    </div>
                    <div>
                        {renderMuscleExerciseGroup ? 
                        <div>
                            <h4>
                            Name of Exercise
                            </h4>
                            <p>
                                {muscleExerciseGroup.name}
                            </p>
                            <h4>
                                How to Perform the Exercise
                            </h4>
                            <p style={{width: "50%", marginLeft: "auto", marginRight: "auto"}}>
                                {muscleExerciseGroup.instructions}
                            </p>
                        </div> : 
                        <div>
                        </div>
                        }
                    </div>
                </div>
                <div className="button-container">
                    <br></br>
                </div>
                <div className="features-list-container">
                    <button className="home-add-exercise" onClick={() => navigate(`/add-exercise/${specificworkout}`)}>ADD EXERCISE</button>
                    <button className="home-cancel-exercise" onClick={() => navigate("/")}>GO BACK TO MAIN PAGE</button>
                </div>
            </div>
        </Layout>
    );
}

export default ExercisePage;