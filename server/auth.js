// import modules
const bcrypt = require('bcrypt')
const crypto = require('crypto')

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
    users.findOne({ username: req.body.username }).then((user) => {
        // determine if password and hash match
        return bcrypt.compare(req.body.password, user.password)
    }).then((pwd_res) => {
        if (pwd_res) {
            // call the next middleware only if the password is correct
            next()
        }
        else {
            // send FORBIDDEN otherwise
            res.sendStatus(403)
        }
    }).catch(() => {
        res.sendStatus(403)
    })
}

// middleware for returning a session id
exports.get_session_id = (req, res) => {
    // create a session id
    crypto.randomBytes(session_id_bits, (err, buf) => {
        if (err) throw err
        let session_id = buf.toString('base64')

        // store the session in MongoDB for later lookup
        sessions.insertOne({
            session_id: session_id,
            username: req.body.username,
            start_time: Date.now()
        }).then(() => {
            // send the session id to the frontend for saving in the browser
            res.send(session_id)
        })
    })
}

// middleware for creating a user
exports.create_user = (req, res) => {
    // hash the password
    bcrypt.hash(req.body.password, salt_rounds).then((hashed_pwd) => {
        // insert to mongo
        return users.insertOne({
            username: req.body.username,
            password: hashed_pwd
        })
    }).then(() => {
        // send success after insert
        res.send()
    })
}

// middleware for removing user
exports.delete_user = (req, res) => {
    users.deleteOne({ username: req.body.username }).then(() => {
        return sessions.deleteMany({ username: req.body.username })
    }).then(() => {
        // send NO CONTENT success after delete
        res.sendStatus(204);
    });
    /* TODO: delete content associated with the user */
}
