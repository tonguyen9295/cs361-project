// initializes router based on instance of express for routing to controller to add exercise
const express = require('express');
const router = express.Router();
const addExerciseController = require('../controllers/AddExerciseController');

router.post("/:specificworkout", addExerciseController.create);

module.exports = router;