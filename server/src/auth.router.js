// import modules
const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const body_parser = require('body-parser');

// configure environment
require('dotenv').config();

// application constants
const salt_rounds = 10;
const session_id_bits = 128;
const router = express.Router();
const db = new mongodb.MongoClient(process.env.MONGO_URI).db(process.env.DB);
const users = db.collection('users');
const sessions = db.collection('sessions');

// parse all POST requests as JSON
router.use(body_parser.json());

// middleware for determining if the user can access the resource
function auth(req, res, next) {
    // get the user's hashed password
    users.findOne({ username: req.body.username }).then((user) => {
        // determine if password and hash match
        return bcrypt.compare(req.body.password, user.password);
    }).then((pwd_res) => {
        if (pwd_res) {
            // call the next middleware only if the password is correct
            next();
        }
        else {
            // send FORBIDDEN otherwise
            res.sendStatus(403);
        }
    }).catch(() => {
        res.sendStatus(403);
    });
}

// login endpoint returns a session id after a successful auth
router.post("/login", auth, (req, res) => {
    // create a session id
    crypto.randomBytes(session_id_bits, (err, buf) => {
        if (err) throw err;
        let session_id = buf.toString('base64');

        // store the session in MongoDB for later lookup
        sessions.insertOne({
            session_id: session_id,
            username: req.body.username,
            start_time: Date.now()
        }).then(() => {
            // send the session id to the frontend for saving in the browser
            res.send(session_id);
        });
    });
});

// create endpoint creates a new user with username and hashed password
router.post("/create", (req, res) => {
    // hash the password
    bcrypt.hash(req.body.password, salt_rounds).then((hashed_pwd) => {
        // insert to mongo
        return users.insertOne({
            username: req.body.username,
            password: hashed_pwd
        });
    }).then(() => {
        // send success after insert
        res.send();
    });
});

// delete endpoint deletes the user after reauthenticating them
router.post("/delete", auth, (req, res) => {
    users.deleteOne({ username: req.body.username }).then(() => {
        return sessions.deleteMany({ username: req.body.username })
    }).then(() => {
        // send NO CONTENT success after delete
        res.sendStatus(204);
    });
    /* TODO: delete content associated with the user */
});

exports.router = router;
