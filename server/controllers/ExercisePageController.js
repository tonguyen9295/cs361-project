const db = require('../database/db-connector');

// get list of exercises for a workout
exports.selectAll = (req, res) => {
    let chosenWorkout = req.params.specificworkout;
    db.pool.query('SELECT * FROM sessionExercises JOIN workoutSession ON sessionExercises.workout = workoutSession.workout WHERE workoutSession.workout = ?', [chosenWorkout], (err, data) => {
        if (err) {
            console.error('Error getting list of exercises for ExercisePage:', err);
            res.status(500).json({ error: 'Failed to get list of exercises for ExercisePage' });
        } else {
            res.json(data);
        }
    });
};

// delete an exercise from a workout
exports.delete = (req, res) => {
    let sessionExercises = req.params.exercise;
    let workout = req.params.specificworkout;
    db.pool.query("DELETE FROM sessionExercises WHERE sessionExercises = ? AND workout = ?", [sessionExercises, workout], (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Failed to delete exercise from workout' });
        } else {
            res.send(data);
        }
    })
};