// module imports
const express = require("express");
const mongodb = require("mongodb");

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
const port = (process.env.PORT !== undefined) ? process.env.PORT : 8080;

// the MongoDB connection also uses an environment variable for security
// defaults or hard codes should never happen since the connection string includes the password
// this will fail if the environment variable is not present
const mongo = new mongodb.MongoClient(process.env.MONGO_URI);

// recommendation route
// takes the "ns" and "id" query parameters to uniquely identify the media to get
app.get("/recommendation", (req, res) => {
    mongo.db(db_name)
        .collection(collection_name)
        .findOne({
            namespace: req.query.ns,
            id: req.query.id
        })
        .then((media) => {
            res.send(media);
        });
});

// start the app
app.listen(port);

