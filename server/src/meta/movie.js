const axios = require('axios')

require('dotenv').config()

const base_url = "https://api.themoviedb.org/3"
const apikey = process.env.TMDB_API_KEY

module.exports = async (req, res) => {
  const title = req.query.title
  let id = null
  let movie = {}
  const search = await axios.get(`${base_url}/search/movie?query=${title}&api_key=${apikey}`)
  if (!search) throw Error();
  if (search.status !== 200) {
    res.sendStatus(search.status)
    return
  } else if (search.data.results.length === 0) {
    res.sendStatus(404)
    return
  }

  id = search.data.results[0].id
  const data = await axios.get(`${base_url}/movie/${id}?api_key=${apikey}`)
  if (data.status !== 200) {
    res.send(data.status)
    return
  }
  movie.title = data.data.title
  movie.rating = data.data.vote_average
  movie.description = data.data.overview
  movie.poster = `https://image.tmdb.org/t/p/w500${data.data.poster_path}`
  movie.budget = data.data.budget
  movie.revenue = data.data.revenue
  
  const credits = await axios.get(`${base_url}/movie/${id}/credits?api_key=${apikey}`)
  if (credits.status !== 200) {
    res.send(credits.status)
    return 
  }

  const crew = credits.data.crew
  const cast = credits.data.cast
  movie.credits = {
    director: crew.find(person => person.job === "Director") || "Unknown", 
    main_cast: cast.slice(0, 5)
  }
  res.send(movie)
}
