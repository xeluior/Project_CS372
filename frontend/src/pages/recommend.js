import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  MoviePageContainer,
  MoviePoster,
  MovieDetails,
  MovieTitle,
  MovieRating,
  MovieDescription,
  MovieDirector,
  MovieCast,
  MovieBudget,
  MovieRevenue,
  BackButton,
} from "../styles/recommendStyle";
import RelatedMovies from "../component/relatedMovies";

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Using a constant namespace 'Film' and getting the movie title from session storage
  const ns = "Film";
  const movieTitle = sessionStorage.getItem("recommend");
  // Remove spaces from the movie title to use as the ID
  const id = movieTitle.replace(/[^a-zA-Z0-9]/g, '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/meta/movie?title=${movieTitle}`);
        const data = response.data;
        
        if (!data.title) throw new Error('Movie not found');

        setMovie({
          ns: ns,
          id: id,
          title: data.title,
          rating: data.rating,
          description: data.description,
          poster: data.poster,
          director: data.credits.director.name || "Unknown",
          cast: data.credits.main_cast.map(actor => actor.name),
          budget: data.budget,
          revenue: data.revenue,
        });

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ns, id]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <MoviePageContainer>
            <MoviePoster bgImage={movie.poster} aria-label={movie.title} />
            <MovieDetails>
              <MovieTitle>{movie.title}</MovieTitle>
              <MovieRating>TMDB Score: {(movie.rating * 10).toFixed(0)}%</MovieRating>
              <MovieDirector>Director: {movie.director}</MovieDirector>
              <MovieCast>Cast: {movie.cast.join(', ')}</MovieCast>
              <MovieBudget>Budget: ${movie.budget.toLocaleString()}</MovieBudget>
              <MovieRevenue isProfit={movie.revenue > movie.budget}>Revenue: ${movie.revenue.toLocaleString()}</MovieRevenue>
              <MovieDescription>{movie.description}</MovieDescription>
              <BackButton onClick={() => window.history.back()}>Go Back</BackButton>
            </MovieDetails>
          </MoviePageContainer>
          <RelatedMovies ns={ns} id={id}></RelatedMovies>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
