const express = require('express')
const likes = require('./likes.js')
const auth = require('./auth.js')
const recommend = require('./recommend.js')

const router = express.Router()
router.put('/', recommend.check_cache, likes.get_page, auth.ensure, likes.add_like)
router.delete('/', recommend.check_cache, likes.get_page, auth.ensure, likes.remove_like)
router.get('/', recommend.check_cache, likes.get_page, auth.ensure, likes.get_likes)

module.exports = { router }
