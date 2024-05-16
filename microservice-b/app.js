// run microservice B at port 3002
const PORT = 3002; 

// require express and cors, initialize express and name it app
const express = require('express');  
const cors = require('cors');
const axios = require('axios');
const app = express();      

// instance of express app will be used to make request for data from MySQL database and process json objects
app.use(express.json())
app.use(cors())

// modified from https://stackoverflow.com/questions/42739256/how-get-random-item-from-es6-map-or-set
function getRandomKey(collection) {
    let keys = Array.from(collection.keys());
    const specifiedItem = keys[Math.floor(Math.random() * keys.length)];
    return collection[specifiedItem]
}

// get list of exercises for a muscle group from api-ninjas
app.get("/exercise/:muscle", async (req, res) => {
    try {
        const request = require('request');
        let {muscle} = req.params;
        request.get({
            url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
            headers: {'X-Api-Key': 'VCzkSJZ/zImDhrbWqvxFpQ==RQHA3MKabPMaJr4B'},
        }, function(error, response, body) {
            if(error) 
                return console.error('Request failed:', error);
            else if(response.statusCode != 200) 
                return console.error('Error:', response.statusCode, body.toString('utf8'));
            else
                res.send(getRandomKey(JSON.parse(response.body)));
        });
    } catch (error) {
        console.error('Error fetching exercise data:', error);
        res.status(500).json({ error: 'Failed to fetch exercise data' });
    }
})

// turn on microservice A
app.listen(PORT, () => { 
    console.log(`Microservice A is live at port ${PORT}`);
});