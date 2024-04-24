const db = require('../database/db-connector');

// create a workout for home page
exports.create = (req, res) => {
    let workout = req.body.workout;
    let dateOfWorkout = req.body.dateOfWorkout;
    db.pool.query("INSERT INTO workoutSession (workout, dateOfWorkout) VALUES (?, ?)", [workout, dateOfWorkout], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Failed to add new workout to home page' });
        } else {
            res.send(result);
        }
    })
};