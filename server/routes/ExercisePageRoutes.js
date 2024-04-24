// initializes router based on instance of express for routing to controller to manipulate list of exercises page
const express = require('express');
const router = express.Router();
const exercisePageController = require('../controllers/ExercisePageController');

router.get('/:specificworkout', exercisePageController.selectAll);
router.delete('/:specificworkout/:exercise', exercisePageController.delete);

module.exports = router;