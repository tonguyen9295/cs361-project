require('dotenv').config();

// initialize express app using port listed in env or at 3000
const PORT = process.env.PORT || 3000;
const path = require("path");
const express = require("express");
const app = express();
const cors = require('cors');
app.use(express.json())
app.use(cors())

// define routes that will be used by express app
const homePageRoute = require("./routes/HomePageRoutes");
const exercisePageRoute = require("./routes/ExercisePageRoutes");
const addWorkoutRoute = require("./routes/AddWorkOutRoutes");
const addExerciseRoute = require("./routes/AddExerciseRoutes");

// have express app use following routes for various CRUD methods
app.use("/", homePageRoute);
app.use("/exercise-page/data", exercisePageRoute);
app.use("/create-workout", addWorkoutRoute);
app.use("/add-exercise", addExerciseRoute);

// serve React build
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// output what port express server is running on
app.listen(PORT, () => {
    console.log(`Node/Express server running on port ${PORT}`)
});