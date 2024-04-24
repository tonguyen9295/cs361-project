const db = require('../database/db-connector');

// create exercise for a workout
exports.create = (req, res) => {
    let sessionExercises = req.body.sessionExercises;
    let sets = req.body.sets;
    let repetitions = req.body.repetitions;
    let weight = req.body.weight;
    let workout = req.params.specificworkout;
    db.pool.query("INSERT INTO sessionExercises (sessionExercises, sets, repetitions, weight, workout) VALUES (?, ?, ?, ?, ?)", [sessionExercises, sets, repetitions, weight, workout], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Failed to add exercise for workout' });
        } else {
            res.send(result);
        }
    })
};