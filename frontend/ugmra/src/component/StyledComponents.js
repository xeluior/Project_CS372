import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const LoginForm = styled.form`
    width: 300px;
    padding: 50px;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    background-color: rgba(255, 255, 255, 0.9); 
    transition: transform 0.3s;

    &:hover {
        transform: translateY(-5px);
    }
`;

export const Input = styled.input`
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 2px solid #48BB78;  // Green border
    border-radius: 5px;
    font-size: 16px;

    &:focus {
        border-color: #68D391;  // Brighter green on focus
        outline: none;
    }
`;

export const Button = styled.button`
    box-sizing: border-box; 
    width: 100%;
    padding: 10px;
    background-color: #48BB78;  // Green button
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #38A169;  // Darker green on hover
    }
`;

export const RegisterLink = styled(Link)`
    display: block;
    margin-top: 10px;
    text-align: center;
    color: #000;  // Black Link
    text-decoration: none;
    padding: 10px;
    transition: color 0.3s;

    &:hover {
        color: ##0000EE;  // Darker green on hover
        text-decoration: underline;
    }
`;

export const Title = styled.h2`
    color: #48BB78;  // Green color to match the theme
    text-align: center;
    margin-bottom: 20px;  // Adds a little spacing between the title and the input fields
`;

