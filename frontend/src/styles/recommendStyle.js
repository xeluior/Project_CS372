import styled from "styled-components";

export const MoviePageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    max-width: 1200px; /* Adjust the maximum width as needed */
    margin: 0 auto; /* Center the container horizontally */
    min-height: 100vh;
`;

export const MoviePoster = styled.div`
    width: 200px;
    height: 300px;
    background-image: url(${props => props.bgImage});
    background-size: cover;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    margin-bottom: 20px; /* Add space at the bottom */
`;

export const MovieDetails = styled.div`
    flex: 1;
`;

export const MovieTitle = styled.h1`
    margin: 0;
    color: white;
`;

export const MovieRating = styled.div`
    margin-top: 10px;
    font-size: 24px;
    color: gold;
`;

export const MovieDescription = styled.p`
    margin-top: 20px;
    color: white;
    line-height: 1.5;
`;

export const BackButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    background-color: #e0e0e0;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #c0c0c0;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px #a0a0a0;
    }
`;
