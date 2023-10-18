// RelatedMovies.js
import React from "react";

const relatedMovies = () => {
  // You can fetch and display related movies here
  const RelatedMovies = [
    // Your related movie data goes here
    {
      title: "Related Movie 1",
      rating: "8.5/10",
      description: "Description for Related Movie 1",
      poster: "https://example.com/related-movie-1.jpg",
    },
    {
      title: "Related Movie 2",
      rating: "7.9/10",
      description: "Description for Related Movie 2",
      poster: "https://example.com/related-movie-2.jpg",
    },
    // Add more related movies as needed
  ];

  return (
    <div>
      <h2>Related Movies</h2>
      <div className="related-movies-list">
        {RelatedMovies.map((movie, index) => (
          <div key={index} className="related-movie">
            <img src={movie.poster} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.rating}</p>
            <p>{movie.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default relatedMovies;
