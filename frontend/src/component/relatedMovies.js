import React from "react";
import { 
    RelatedMoviesContainer, 
    RelatedTitle, 
    RelatedMovieTitle, 
    RelatedDescription, 
    RelatedRating, 
    RelatedMoviePoster, 
    RelatedMoviesList, 
    RelatedMovieContainer 
} from "../styles/relatedStyle";

const relatedMovies = () => {
    const RelatedMovies = [
        {
            title: "Related Movie 1",
            rating: "8.5/10",
            description: "Description for Related Movie 1",
            poster: "https://artworks.thetvdb.com/banners/movies/113/posters/2195447.jpg",
        },
        {
            title: "Related Movie 2",
            rating: "7.9/10",
            description: "Description for Related Movie 2",
            poster: "https://artworks.thetvdb.com/banners/movies/113/posters/2195447.jpg",
        },
    ];

    return (
        <RelatedMoviesContainer>
            <RelatedTitle>Related Movies</RelatedTitle>
            <RelatedMoviesList>
                {RelatedMovies.map((movie, index) => (
                    <RelatedMovieContainer key={index}>
                        <RelatedMoviePoster bgImage={movie.poster} aria-label={movie.title}></RelatedMoviePoster>
                        <RelatedMovieTitle>{movie.title}</RelatedMovieTitle>
                        <RelatedRating>{movie.rating}</RelatedRating>
                        <RelatedDescription>{movie.description}</RelatedDescription>
                    </RelatedMovieContainer>
                ))}
            </RelatedMoviesList>
        </RelatedMoviesContainer>
    );
};

export default relatedMovies;
