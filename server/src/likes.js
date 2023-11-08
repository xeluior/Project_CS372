const { MongoClient } = require('mongodb')
require('dotenv').config()

const mongodb = new MongoClient(process.env.MONGO_URI)
const db = mongodb.db(process.env.DB)
const pages = db.collection('pages');

async function add_like(req, res) {
  const page = await pages.findOne({ns: req.query.ns, id: req.query.id})
  if (!page) {
    res.sendStatus(404)
    return
  }

  const user = req.session.uid
  if (!user) {
    res.sendStatus(403)
    return
  }

  const recommendation = page.recommendations.findIndex((item) => {
    return item.ns === req.query.rns && item.id === req.query.rid
  })

  const likes = page.recommendations[recommendation].likes || []
  if (likes.includes(user)) {
    res.sendStatus(400)
    return
  }

  likes.push(user)
  await pages.updateOne(
    {_id: page._id},
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

module.exports = { add_like }
