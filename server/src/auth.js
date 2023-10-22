// import modules
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const mongodb = require('mongodb')

// configure the environment
require('dotenv').config()

// application constants
const salt_rounds = 10
const session_id_bits = 128
const db = new mongodb.MongoClient(process.env.MONGO_URI).db(process.env.DB)
const users = db.collection('users')
const sessions = db.collection('sessions')

// middleware for checking the user's password
// requires that the router or app use a body parser
exports.check_password = (req, res, next) => {
    // get the user's hashed password
    users.findOne({ email: req.body.email }).then((user) => {
        // determine if password and hash match
        return bcrypt.compare(req.body.password, user.password)
    }).then((pwd_res) => {
        if (pwd_res) {
            // store the email (uid) in the session and send to the target or the homepage
            req.session.uid = req.body.email
            res.redirect(303, req.query.redirect || '/')
        }
        else {
            console.log(`Invalid login attempt from ${req.ip}`)
            // send FORBIDDEN otherwise
            res.sendStatus(403)
        }
    }).catch((err) => {
        console.log(err)
        res.sendStatus(403)
    })
}

// middleware for validating an existing session
exports.check_token = (req, res, next) => {
    users.findOne({ email: req.session.email }).then((user) => {
        if (user) {
            next()
        } else {
            res.sendStatus(403)
        }
    })
}

// middleware for creating a user
exports.create_user = (req, res) => {
    // hash the password
    console.log(req.body)
    bcrypt.hash(req.body.password, salt_rounds).then((hashed_pwd) => {
        // insert to mongo
        return users.insertOne({
            email: req.body.email,
            password: hashed_pwd
        })
    }).then(() => {
        // send the user to the login screen
        res.redirect(303, '/login')
    })
}

// middleware for removing user
exports.delete_user = (req, res) => {
    req.session.destroy(() => {
        users.deleteOne({ email: req.body.email }).then(() => {
            // redirect the user to the main page
            res.redirect(303, '/')
        })
    })
    /* TODO: delete content associated with the user */
}
