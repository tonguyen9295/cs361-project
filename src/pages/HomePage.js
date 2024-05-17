import React from "react";
import Layout from "../components/layout/layout";
import { RxBorderSolid, RxPlus } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";

// create home page that shows list of workouts
function HomePage() {

    // use to navigate React pages
    const navigate = useNavigate();

    // get data of all workouts from database
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchWorkouts(); 
    }, []);
    
    const fetchWorkouts = async () => {
        try {
            const response = await axios.get('/data'); 
            setData(response.data); 
        } catch (err) {
            console.error('Error getting data from MySQL database:', err);
        }
    };

    // delete a workout from database
    const deleteData = async (workout) => {
        try {
            await axios.delete("/delete/" + workout);
            window.location.reload()
        } catch (err) {
            console.error("Failed to delete workout from MySQL database:", err);
        }
    };

    return (
        <Layout>
            <div>
                <h1 className="page-title-container">Main Page</h1>
                <div className="table-container">
                    <div className="table-style">
                        <table>
                            <thead>
                                <tr>
                                    <th>Workout Name</th>
                                    <th>Date of Workout</th>
                                    <th>Delete Workout</th>
                                    <th>View Exercises</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <th><Link className="style-Link" to={`/exercise-page/${item.workout}`}>{item.workout}</Link></th>
                                        <th>{moment(item.dateOfWorkout).utc().format("YYYY-MM-DD")}</th>
                                        <th><RxBorderSolid onClick={() => 
                                            {
                                            if (window.confirm('Are you SURE you want to delete this workout? This action is IRREVERSIBLE!')) 
                                                deleteData(item.workout);
                                            } 
                                            }/></th>
                                        <th><Link to={`/exercise-page/${item.workout}`}><RxPlus/></Link></th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="button-container">
                    <button className="home-add-workout" onClick={() => {navigate("/create-workout")}}>NEW WORKOUT</button>
                </div>
            </div>
            <div className="features-list-container">
                <div className="current-features-container"> 
                    <ul><h4 className="list-title">Current Features</h4>
                        <li>
                            - allows you to delete a workout
                        </li>
                        <li>
                            + allows you to view exercises in a workout
                        </li>
                        <li>
                            "NEW WORKOUT" button allows you to add a new workout
                        </li>
                    </ul>
                </div> 
                <div className="new-features-container">
                    <ul><h4 className="list-title">New Features</h4>
                        <li>
                            Top left logo takes you to main page of list of workouts 
                        </li>
                        <li>
                            Top right logo takes you to help page to show you how to use this application
                        </li>
                    </ul>
                </div>
            </div>
        </Layout>
    );
}

export default HomePage;