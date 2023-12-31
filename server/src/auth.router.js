// import modules
const express = require('express');
const body_parser = require('body-parser')
const auth = require('./auth.js')

// application constants
const router = express.Router()

// parse all POST requests as urlencoded
router.use(body_parser.urlencoded())

// login endpoint returns a session id after a successful password check
router.post("/login", auth.check_password)

// create endpoint creates a new user with username and hashed password
router.post("/create", auth.create_user)

// delete endpoint deletes the user after reauthenticating them
router.post("/delete", auth.delete_user)

router.get("/logout", auth.logout)

exports.router = router;
