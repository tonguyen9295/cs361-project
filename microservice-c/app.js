// require MySQL for microservice A
const mysql = require('mysql')

// run microservice C at port 3003
const PORT = 3003; 

// provide login credential to access MySQL database
const pool = mysql.createPool({
    connectionLimit: 10,
    host            : 'sql5.freemysqlhosting.net',
    user            : 'sql5700621',
    password        : '59aLYtEn31',
    database        : 'sql5700621'
});

// require express and cors, initialize express and name it app
const express = require('express');   
const cors = require('cors') 
const app = express();      

// instance of express app will be used to make request for data from MySQL database and process json objects
app.use(express.json())
app.use(cors())

// get values of attributes for an exercise to incorporate on update exercise page
app.get('/get-exercise-data/:specificWorkout/:sessionexercise', async (req, res) => {
    let specificWorkout = req.params.specificWorkout;
    let specificExercise = req.params.sessionexercise;
    pool.query('SELECT * FROM sessionExercises WHERE sessionExercises.sessionExercises = ? AND sessionExercises.workout = ?', [specificExercise, specificWorkout], (err, result) => {
        if (err) {
            res.status(500).json({ error:  "Failed to update exercise" });
        } else {
            res.send(result);
        }
    })
});

// updates values of an exercise's attributes
app.put('/update-exercise/:specificWorkout/:sessionexercise', async (req, res) => {
    let specificWorkout = req.params.specificWorkout;
    let sessionexercise = req.params.sessionexercise;
    let sessionExercises = req.body.exerciseName;
    let sets = req.body.exerciseSets;
    let repetitions = req.body.exerciseRepetitions;
    let weight = req.body.exerciseWeight;
    pool.query("UPDATE sessionExercises SET sessionExercises = ?, sets = ?, repetitions = ?, weight = ? WHERE sessionExercises.sessionExercises = ? AND sessionExercises.workout = ?", [sessionExercises, sets, repetitions, weight, sessionexercise, specificWorkout], (err, result) => {
        if (err) {
            res.status(500).json({ error:  "Failed to update exercise" });
        } else {
            res.send(result);
        }
    })
});

// turn on microservice C
app.listen(PORT, () => { 
    console.log(`Microservice C is live at port ${PORT}`);
});