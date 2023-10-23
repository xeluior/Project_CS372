import React, { useState, useEffect } from "react";
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
import { searchMovie, fetchMovieDetails, fetchMovieCredits } from "../lib/movieAPI"; // Adjust the path accordingly


const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState([]);
  const [budget, setBudget] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const movieTitle = "Interstellar";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchData = await searchMovie(movieTitle);
        const movieId = searchData.results[0]?.id;

        if (!movieId) throw new Error('Movie not found');

        const detailsData = await fetchMovieDetails(movieId);
        
        setMovie({
          title: detailsData.title,
          rating: detailsData.vote_average,
          description: detailsData.overview,
          poster: `https://image.tmdb.org/t/p/w500${detailsData.poster_path}`
        });

        setBudget(detailsData.budget);
        setRevenue(detailsData.revenue);

        const creditsData = await fetchMovieCredits(movieId);
        const directorInfo = creditsData.crew.find(person => person.job === 'Director');
        const mainCast = creditsData.cast.slice(0, 5);

        setDirector(directorInfo?.name || "Unknown");
        setCast(mainCast.map(actor => actor.name));

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieTitle]);

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
              <MovieDirector>Director: {director}</MovieDirector>
              <MovieCast>Cast: {cast.join(', ')}</MovieCast>
              <MovieBudget>Budget: ${budget.toLocaleString()}</MovieBudget>
              <MovieRevenue isProfit={revenue > budget}>Revenue: ${revenue.toLocaleString()}</MovieRevenue>
              <MovieDescription>{movie.description}</MovieDescription>
              <BackButton onClick={() => window.history.back()}>Go Back</BackButton>
            </MovieDetails>
          </MoviePageContainer>
          <RelatedMovies></RelatedMovies>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
