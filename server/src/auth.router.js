// import modules
const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');

// configure environment
require('dotenv').config();

// application constants
const salt_rounds = 10;
const router = express.Router();
const users = mongodb.MongoClient(process.env.MONGO_URI).db(/* TODO */).collection(/* TODO */);

// middleware for determining if the user can access the resource
function auth(req, _, next) {
    // get the user's hashed password
    users.findOne({ username: req.body.username }).then((user) => {
        // determine if password and hash match
        return bcrypt.compare(req.body.password, user.password);
    }).then((res) => {
        if (res) {
            // call the next middleware only if the password is correct
            next();
        }
        else {
            // send FORBIDDEN otherwise
            res.sendStatus(403);
        }
    });
}

// login endpoint returns a session id after a successful auth
router.post("/auth/login", auth, (_, res) => {
    res.send(/* TODO: session id */);
});

// create endpoint creates a new user with username and hashed password
router.post("/auth/create", (req, res) => {
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
router.post("/auth/delete", auth, (req, res) => {
    users.deleteOne({ username: req.body.username }).then(() => {
        // send NO CONTENT success after delete
        res.sendStatus(204);
    });
    /* TODO: delete content associated with the user */
});

