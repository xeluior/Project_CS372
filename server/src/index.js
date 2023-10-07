// module imports
const express = require("express");
const mongodb = require("mongodb");
const session = require('express-session')
const auth = require('./auth.router.js');
const cors = require('cors');

// environment configuration from .env file
require("dotenv").config()

// configuration constants
const db_name = process.env.DB
const collection_name = process.env.MEDIA_COLLECTION

// initialize the express app
const app = express()

// define the port based on an environment variable
// this will assist in deployment to Google Cloud
// it defaults to 8080 for local development
const port = process.env.PORT || 8080

// the MongoDB connection also uses an environment variable for security
// defaults or hard codes should never happen since the connection string includes the password
// this will fail if the environment variable is not present
const mongo = new mongodb.MongoClient(process.env.MONGO_URI)
const media = mongo.db(db_name).collection(collection_name)

// use additional routes
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}))
app.use(cors());
app.use('/auth', auth.router)

// recommendation route
// takes the "ns" and "id" query parameters to uniquely identify the media to get
app.get("/recommendation", (req, res) => {
    media.findOne({
        namespace: req.query.ns,
        id: req.query.id
    })
    .then((result) => {
        /* TODO: actually recommend things */
        res.send(result)
    })
})

// search route
// a "text" index needs to be made on the title field before this will work
app.get("/search", (req, res) => {
    /* recieve url request
    return json response res.send */
    //get query
    
    media.find({
        /* TODO: filters */
        $text: {
            $search: req.query.title
        }
    })
    .toArray()
    .then((result) => {
        res.send(result)
    })
})

// server react from the server
app.use(express.static('../frontend/build'))
// start the app
app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})

