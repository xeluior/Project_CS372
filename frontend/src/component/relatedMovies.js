import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
import { 
    RelatedMoviesContainer, 
    RelatedTitle, 
    RelatedMovieTitle,
    RelatedRating, 
    RelatedMoviePoster, 
    RelatedMoviesList, 
    RelatedMovieContainer 
} from '../styles/relatedStyle';

const RelatedMovies = ({ ns, id }) => {
    const [relatedMovies, setRelatedMovies] = useState([]);
    //const navigate = useNavigate();

    useEffect(() => {
        const fetchRelatedMovies = async () => {
            try {
                const response = await axios.get(`/recommendation?ns=${ns}&id=${id}`);
                const relatedMoviesData = response.data.filter(item => item !== null && item.ns === "Film");

                const metadataPromises = await Promise.all(relatedMoviesData.map(async movie => {
                    try {
                        return await axios.get(`/meta/movie?title=${movie.title}`);
                    } catch (error) {
                        console.error("Error fetching movie title");
                        return { data: {} };
                    }
                }));

                const relatedMoviesWithMetadata = metadataPromises.map((response, index) => ({
                    ...relatedMoviesData[index],
                    ...response.data
                }));

                const limitedMovies = relatedMoviesWithMetadata.slice(0, 200);
                setRelatedMovies(limitedMovies);
            } catch (error) {
                console.error('Error fetching related movies:', error);
            }
        };

        fetchRelatedMovies();
    }, [ns, id]);

    const redirectToMovieDetail = (movieTitle) => {
        console.log('Redirecting to /recommend');
        sessionStorage.setItem("recommend", movieTitle);
        //navigate('/recommend'); // Use navigate for navigation
        window.location.reload();
    };

    return (
        <RelatedMoviesContainer>
            <RelatedTitle>Related Movies</RelatedTitle>
            <RelatedMoviesList>
                {relatedMovies.map((movie, index) => {
                    if (movie.poster) {
                        return (
                            <RelatedMovieContainer key={index}>
                                <RelatedMoviePoster 
                                    bgImage={movie.poster} 
                                    aria-label={movie.title}
                                    onClick={() => redirectToMovieDetail(movie.title)}
                                ></RelatedMoviePoster>
                                <RelatedMovieTitle>{movie.title}</RelatedMovieTitle>
                                <RelatedRating>{(movie.rating * 10).toFixed(0)}%</RelatedRating>
                            </RelatedMovieContainer>
                        );
                    }
                    return null;
                })}
            </RelatedMoviesList>
        </RelatedMoviesContainer>
    );
};

export default RelatedMovies;
