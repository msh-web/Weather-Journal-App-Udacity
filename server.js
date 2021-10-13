// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes.
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
app.listen(port, ()=>{
    console.log(`This server is running on localhost: ${port}`)
});

//This endpoint to return the JS object.
    app.get('/getData', (req, res) => {
          res.send(projectData);
});
// POST Route      
app.post('/addData', (req, res) =>{
     projectData = {...req.body};
     res.send(projectData).status(200).end();
});
