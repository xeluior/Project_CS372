import styled from "styled-components";

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
    margin-bottom: 20px; // Add some spacing below the title
`;

export const RelatedMoviePoster = styled.div`
    width: 200px;
    height: 300px;
    background-image: url(${props => props.bgImage});
    background-size: cover;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    margin-bottom: 20px;
`;

export const RelatedMovieTitle = styled.h3`
    color: white;
    margin: 0;
`;

export const RelatedRating = styled.div`
    color: gold;
    margin: 10px 0;
`;

export const RelatedDescription = styled.p`
    color: white;
`;

export const RelatedMoviesList = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
`;

export const RelatedMovieContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
