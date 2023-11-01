const express = require('express')
const bodyParser = require('body-parser')
const movie = require('./meta/movie.js')

const router = express.Router()

router.use(bodyParser.json())

router.get('/movie', movie)

module.exports.router = router

