const { MongoClient } = require('mongodb')
require('dotenv').config()

const mongodb = new MongoClient(process.env.MONGO_URI)
const db = mongodb.db(process.env.DB)
const pages = db.collection('pages')

// yoinked from Henry's serverside code
let media_namespaces = [
  "Advertising",
  "Animation",
  "Anime",
  "ARG",
  "Art",
  "AudoPlay",
  "Blog",
  "ComicBook",
  "ComicStrip",
  "Creator",
  "Fanfic",
  "Film",
  "Franchise",
  "Literature",
  "Magazine",
  "Manga",
  "Manhua",
  "Manhwa",
  "Music",
  "Myth",
  "Pinball",
  "Podcast",
  "Radio",
  "Ride",
  "Roleplay",
  "Script",
  "Series",
  "TabletopGame",
  "Theatre",
  "Toys",
  "VideoGame",
  "VisualNovel",
  "WebAnimation",
  "WebComic",
  "Website",
  "WebOriginal",
  "WebVideo",
  "WesternAnimation",
  "Wrestling",
]

// define how long to keep recommendations for before regenerating the scores
const cache_days = 1

// fills the database with the calculated recommendations iff it has none or they are outdated
// the algorithm for calculating score is O(n^2) so we need to cache the result for a time
async function check_cache(req, res, next) {
  // helper function since there no "day add" feature
  function get_ttl() {
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + cache_days)
    return tomorrow
  }

  // get some basic page information
  const page = await pages.findOne({ ns: req.query.ns, id: req.query.id })
  if (!page) {
    res.sendStatus(404)
    return;
  }

  const has_recs = page.recommendations !== undefined
  const ttl_outdated = (() => {
    if (page.rec_cache_ttl) {
      return page.rec_cache_ttl < new Date()
    } else {
      return true
    }
  })()

  if (!has_recs || ttl_outdated) {
    // regenerate scores but not likes
    // reset scores if they already exist
    const recs = (() => {
      if (has_recs) {
        return page.recommendations.map((item) => {
          item.score = 0
        })
      } else {
        return []
      }
    })()

    // the following block generates scores by getting all pages the current page links to
    // getting the pages *those* pages link to, and counting how many times the second set
    // of pages are seen. In effect, how many different ways is a page related to the current
    // page.
    for (const link of page.links) {
      const result = await pages.findOne({ ns: link.ns, id: link.id })
      if (!result) {
        console.error(`Attempted to access nonexistent page ${link.ns}/${link.id}`)
        continue
      }

      for (const recommendation of result.links) {
        if (!media_namespaces.includes(recommendation.ns)) continue

        const rec = recs.findIndex((item) => {
          if (!item) return false
          return item.ns === recommendation.ns && item.id === recommendation.id
        })
        if (rec !== -1) {
          recs[rec].score += 1
        } else {
          recs.push({
            ns: recommendation.ns,
            id: recommendation.id,
            score: 1
          })
        }
      }
    }

    // since we get the recommendations earlier, we just clobber whatever is in the database
    // this may lose some likes which have been added while the algorithm is running
    await pages.updateOne({_id: page._id}, { $set: {
      rec_cache_ttl: get_ttl(),
      recommendations: recs
    }})
  }

  next()
}

// calculates the final score based on likes as well as score
// removes the likes list from the result to avoid leaking data to the frontend
async function get_recommendations(req, res) {
  const page = await pages.findOne({ ns: req.query.ns, id: req.query.id })
  const recommendations = page.recommendations || []
  
  res.send(recommendations.map((item) => {
    if (!item) return undefined
    if (item.likes) {
      item.score += item.likes.length
      item.likes = undefined
    }
    return item
  }))
}

module.exports = { check_cache, get_recommendations }
