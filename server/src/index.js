// module imports
const express = require("express");
const mongodb = require("mongodb");
const session = require('express-session')
const auth = require('./auth.router.js')
const meta = require('./meta.router.js')
const cors = require('cors')
const path = require('path')

// environment configuration from .env file
require("dotenv").config()

// configuration constants
const db_name = 'media-db'
const pages_collection_name = 'pages'
const user_collection_name = 'users'

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
const media = mongo.db(db_name).collection(pages_collection_name)
const users = mongo.db(db_name).collection(user_collection_name)

// use additional routes
app.use(cors())
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}))
app.use('/auth', auth.router)
app.use('/meta', meta.router)

// recommendation route
// takes the "ns" and "id" query parameters to uniquely identify the media to get
app.get("/recommendation", (req, res) => {
    media.findOne({
        ns: req.query.ns,
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

//watch later function
app.post("/watch-later", (req, res) => {
    /*get user id based on token (session id)
    add namespace:id of item to json attribute*/
    
    //check if user is logged in
    if (req.session.uid !== null) {
        const watch_later = { id: req.query.id, title: req.body }
        //if watch-later exists, update
        if (!media.find(watch_later)) {
            users.update(
                {
                    id: req.session.uid,
                },
                { 
                    // make watch-later an array and .add() trope
                    $addToSet: {
                        watch_later: watch_later
                    }
                }
            )
            res.sendStatus(200)
        }
        else {
            users.insert(
                {
                    watch_later: {id: req.query.id, title: req.body}
                }
            )
            res.sendStatus(200)
        }
    }
    else {
        res.sendStatus(403)
    }

})

// serve static resources from the server
const react_dist = path.join(__dirname, '../../frontend/build')
app.use(express.static(react_dist))

// redirect all unhandled requests to React-Router to handle
app.get('*', (req, res) => {
    res.sendFile('index.html', { root: react_dist })
})

// start the app
app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})

