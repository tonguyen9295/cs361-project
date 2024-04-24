const db = require('../database/db-connector');

// get list of workouts on home page
exports.selectAll = (req, res) => {
    let query = 'SELECT * FROM workoutSession';
    db.pool.query(query, (err, data) => {
        if (err) {
            console.error('Error fetching data for HomePage:', err);
            res.status(500).json({ error: 'Failed to get list of workouts for HomePage' });
        } else {
            res.json(data);
        }
    });
};

// delete a workout on home page
exports.delete = (req, res) => {
    let workout = req.params.workout;
    db.pool.query("DELETE FROM workoutSession WHERE workout = ?", [workout], (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Failed to delete workout' });
        } else {
            res.send(data); 
        }
    })
};