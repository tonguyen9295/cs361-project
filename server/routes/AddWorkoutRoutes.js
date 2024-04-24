// initializes router based on instance of express for routing to controller to add a workout
const express = require('express');
const router = express.Router();
const addWorkoutController = require('../controllers/AddWorkoutController');

router.post("/create", addWorkoutController.create);

module.exports = router;