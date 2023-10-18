// import modules
const express = require('express');
const body_parser = require('body-parser');
const auth = require('./auth.js')

// application constants
const router = express.Router();

// parse all POST requests as JSON
router.use(body_parser.json());

// login endpoint returns a session id after a successful password check
router.post("/login", auth.check_password);

// create endpoint creates a new user with username and hashed password
router.post("/create", auth.create_user);

// delete endpoint deletes the user after reauthenticating them
router.post("/delete", auth.delete_user);

exports.router = router;
