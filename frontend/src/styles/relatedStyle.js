import styled from 'styled-components';

// Styled components
export const RelatedMoviesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
`;

export const RelatedTitle = styled.h2`
    color: white;
    margin-bottom: 20px;
`;


export const RelatedMoviePoster = styled.div`
    width: 200px;
    height: 300px;
    background-image: url(${props => props.bgImage});
    background-size: cover;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    margin-bottom: 20px;
    cursor: pointer; // Add cursor style
`;

export const RelatedMovieTitle = styled.h3`
    color: white;
    margin: 0;
    text-align: center;
    word-wrap: break-word; // Allows the title to break into a new line
    max-width: 180px; // Maintains the width limit
`;


export const RelatedRating = styled.div`
    color: gold;
    margin: 10px 0;
`;

export const RelatedMoviesList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
`;

export const RelatedMovieContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(20% - 16px);
`;