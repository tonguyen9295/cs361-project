// run microservice D at port 3004
const PORT = 3004; 

// require express and cors, initialize express and name it app
const express = require('express');   
const cors = require('cors') 
const app = express();      

// instance of express app will be used to make request for data from MySQL database and process json objects
app.use(express.json())
app.use(cors())

// api credential for email validation
const userId = 61565;
const apiKey = "rzoz8geNlCIbYySrRnKh"

// check if email is valid
function checkValidEmail(value) {
    const valid = 1;
    if (value === valid) {
        return {emailValid : 1}
    } return {emailValid : 0}
}

// get status of email validity
app.post("/contact-us/response", async (req, res) => {
    try {
        const email = req.body.userEmail;
        const response = await fetch(`https://api.proofy.io/verifyaddr?aid=${userId}&key=${apiKey}&email=${email}`);
        const cid = await response.json();
        const numOfCid = cid["cid"];
        const resultResponse = await fetch(`https://api.proofy.io/getresult?aid=${userId}&key=${apiKey}&cid=${numOfCid}`);
        console.log(resultResponse)
        const checkResults = await resultResponse.json();
        console.log(checkResults)
        const outcome = checkResults.result[0].status;
        res.json(checkValidEmail(outcome));
    } catch (error) {
        console.error('Error getting email validation data:', error);
        res.status(500).json({ error: 'Failed to get email validation data' });
    }
});

// turn on microservice D
app.listen(PORT, () => { 
    console.log(`Microservice A is live at port ${PORT}`);
});