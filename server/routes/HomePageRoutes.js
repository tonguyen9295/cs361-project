// initializes router based on instance of express for routing to controller to manipulate list of workouts on main page
const express = require('express');
const router = express.Router();
const homePageController = require('../controllers/HomePageController');

router.get('/data', homePageController.selectAll);
router.delete('/delete/:workout', homePageController.delete);

module.exports = router;