import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    RelatedMoviesContainer, 
    RelatedTitle, 
    RelatedMovieTitle, 
    RelatedDescription, 
    RelatedRating, 
    RelatedMoviePoster, 
    RelatedMoviesList, 
    RelatedMovieContainer 
} from '../styles/relatedStyle';

const RelatedMovies = ({ ns, id }) => {
    const [relatedMovies, setRelatedMovies] = useState([]);

    useEffect(() => {
        const fetchRelatedMovies = async () => {
            try {
                const response = await axios.get(`/recommendation?ns=${ns}&id=${id}`);
                const relatedMoviesData = response.data;

                // Fetch additional metadata for each movie
                const metadataPromises = relatedMoviesData.map(movie => 
                    axios.get(`/meta/movie?title=${movie.title}`) // Adjust this endpoint as needed
                );

                const metadataResponses = await Promise.all(metadataPromises);
                const relatedMoviesWithMetadata = metadataResponses.map((response, index) => ({
                    ...relatedMoviesData[index],
                    ...response.data // Merge the original movie data with the additional metadata
                }));

                setRelatedMovies(relatedMoviesWithMetadata);
            } catch (error) {
                console.error('Error fetching related movies:', error);
            }
        };

        fetchRelatedMovies();
    }, [ns, id]);

    return (
        <RelatedMoviesContainer>
            <RelatedTitle>Related Movies</RelatedTitle>
            <RelatedMoviesList>
                {relatedMovies.map((movie, index) => (
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

export default RelatedMovies;
