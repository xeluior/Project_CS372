// module imports
const express = require("express");
const mongodb = require("mongodb");
const auth = require('./auth.router.js');
const cors = require('cors');

// environment configuration from .env file
require("dotenv").config();

// configuration constants
const db_name = 'media';
const collection_name = 'media';

// initialize the express app
const app = express();

// define the port based on an environment variable
// this will assist in deployment to Google Cloud
// it defaults to 8080 for local development
const port = process.env.PORT || 8080;

// the MongoDB connection also uses an environment variable for security
// defaults or hard codes should never happen since the connection string includes the password
// this will fail if the environment variable is not present
const mongo = new mongodb.MongoClient(process.env.MONGO_URI);
const media = mongo.db(db_name).collection(collection_name);

// use additional routes
app.use(cors());
app.use(auth.router);

// recommendation route
// takes the "ns" and "id" query parameters to uniquely identify the media to get
app.get("/recommendation", (req, res) => {
    media.findOne({
        namespace: req.query.ns,
        id: req.query.id
    })
    .then((result) => {
        /* TODO: actually recommend things */
        res.send(result);
    });
});

// search route
// a "text" index needs to be made on the title field before this will work
app.get("/search", (req, res) => {
    /* recieve url request
    return json response res.send */
    //get query
    
    const filters = req.query;
    const filteredTrope = media.filter(trope => {
    //if query exists, return json response
    let isValid = false;
    for (key in filters) {
        console.log(key, trope[key], filters[key]);
        isValid = trope[key] === filters[key];
    }
    return isValid;
    });
    res.send(filteredTrope);

});

// start the app
app.listen(port);

