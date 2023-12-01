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
                const response = await axios.get(`/recommend?ns=${ns}&id=${id}`);
                setRelatedMovies(response.data);
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
