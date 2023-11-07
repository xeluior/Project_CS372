const axios = require('axios')

require('dotenv').config()

const base_url = "https://api.themoviedb.org/3"
const apikey = process.env.TMDB_API_KEY

module.exports = (req, res) => {
  const title = req.query.title
  let id = null
  let movie = {}
  axios.get(`${base_url}/search/movie?query=${title}&api_key=${apikey}`).then((response) => {
    if (response.status !== 200) {
      res.send(response.status)
    } else if (response.data.results.length === 0) {
      res.send(404)
    } else {
      id = response.data.results[0].id
      return axios.get(`${base_url}/movie/${id}?api_key=${apikey}`)
    }
  }).then((response) => {
    if (response.status !== 200) {
      res.send(response.status)
    } else {
      movie.title = response.data.title
      movie.rating = response.data.vote_average
      movie.description = response.data.overview
      movie.poster = `https://image.tmdb.org/t/p/w500${response.data.poster_path}`
      movie.budget = response.data.budget
      movie.revenue = response.data.revenue
      
      return axios.get(`${base_url}/movie/${id}/credits?api_key=${apikey}`)
    }
  }).then((response) => {
    if (response.status !== 200) {
        res.send(response.status)
      } else {
        const crew = response.data.crew
        const cast = response.data.cast
        movie.credits = {
          director: crew.find(person => person.job === "Director") || "Unknown", 
          main_cast: cast.slice(0, 5)
        }
        res.send(movie)
      }
  })
}
