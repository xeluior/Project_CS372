import React from "react";
import {
  MoviePageContainer,
  MoviePoster,
  MovieDetails,
  MovieTitle,
  MovieRating,
  MovieDescription,
  BackButton,
} from "../styles/recommendStyle";

import _relatedMovies from "../component/relatedMovies.js"; 

const MovieDetail = () => {
  const movie = {
    title: "Inception",
    rating: "8.8/10",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    poster:
      "https://artworks.thetvdb.com/banners/movies/113/posters/2195447.jpg",
  };

  return (
    <div>
      <MoviePageContainer>
        <MoviePoster bgImage={movie.poster} aria-label={movie.title} />
        <MovieDetails>
          <MovieTitle>{movie.title}</MovieTitle>
          <MovieRating>{movie.rating}</MovieRating>
          <MovieDescription>{movie.description}</MovieDescription>
          <BackButton onClick={() => window.history.back()}>Go Back</BackButton>
        </MovieDetails>
      </MoviePageContainer>
      <relatedMovies />
    </div>
  );
};

export default MovieDetail;
