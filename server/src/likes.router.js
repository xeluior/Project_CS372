const express = require('express')
const likes = require('./likes.js')
const recommend = require('./recommend.js')

const router = express.Router()
router.put('/', recommend.check_cache, likes.add_like)

module.exports = { router }
