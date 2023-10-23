// movieApi.js

const API_KEY = "553fdf9e98819206d4850a4240daf948";
const BASE_URL = "https://api.themoviedb.org/3";

export const searchMovie = async (title) => {
    const response = await fetch(`${BASE_URL}/search/movie?query=${encodeURIComponent(title)}&api_key=${API_KEY}`);
    return await response.json();
}

export const fetchMovieDetails = async (movieId) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    return await response.json();
}

export const fetchMovieCredits = async (movieId) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
    return await response.json();
}
