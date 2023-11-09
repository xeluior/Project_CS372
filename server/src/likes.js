const { MongoClient } = require('mongodb')
require('dotenv').config()

const mongodb = new MongoClient(process.env.MONGO_URI)
const db = mongodb.db(process.env.DB)
const pages = db.collection('pages');

// middleware to store mongoDB objects along with the request
async function get_page(req, res, next) {
  const page = await pages.findOne({ns: req.query.ns, id: req.query.id})
  if (!page) {
    res.sendStatus(404)
    return
  }

  req.page = page
  next()
}

// for a given MongoDB Page object, finds the recommendation object specified
async function find_rec(page, rns, rid) {
  if (!page.recommendations) {
    return undefined
  }

  return page.recommendations.find((item) => {
    if (!item) return false
    return item.ns === rns && item.id === rid
  })
}

// adds the currently signed in user's like to the recommendation on page `req.page` for the media
// identified by req.query.rns and req.query.rid
// Always use the get_page middleware before this
async function add_like(req, res) {
  const recommendation = find_rec(req.page, req.query.rns, req.query.rid)

  const likes = recommendation.likes || []
  if (likes.includes(req.session.uid)) {
    res.sendStatus(400)
    return
  }

  likes.push(req.session.uid)
  await pages.updateOne(
    {_id: req.page._id},
    {$set: {
      "recommendations.$[x].likes": likes
    }},
    {
      arrayFilters: [{
        $and: [
          {"x.ns": {$eq: req.query.rns}},
          {"x.id": {$eq: req.query.rid}}
        ]
      }]
    }
  )
  res.sendStatus(201)
}

// removes the currently signed in user's like to the recommendation on page `req.page` for the media
// identified by req.query.rns and req.query.rid
// Always use the get_page middleware before this
async function remove_like(req, res) {
  await pages.updateOne(
    {_id: req.page._id},
    { $pull: { "recommendations.$[x].likes": req.session.uid } },
    {
      arrayFilters: [{
        $and: [
          {"x.ns": {$eq: req.query.rns}},
          {"x.id": {$eq: req.query.rid}}
        ]
      }]
    }
  )
  res.sendStatus(204)
}

module.exports = { remove_like, add_like, get_page }
