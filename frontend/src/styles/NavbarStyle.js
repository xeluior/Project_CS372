import styled from "styled-components";
import { Link } from "react-router-dom";


export const NavbarContainer = styled.nav`
    width: 100%;
    height: 50px;
    background-color: #48BB78;
    display: flex;
    border-radius: 15px;
    flex-direction: column;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); // This adds a shadow below the navbar
    margin: 10px 0;  // This gives some space above and below the navbar
    position: relative;  // Ensures the navbar is above other elements
    z-index: 1;  // Keeps the navbar on top
`

export const LeftContainer = styled.div`
    flex: 60%;
    display: flex;
    align-items: center;
    padding: 20px;

`;

export const RightContainer = styled.div`
    flex: 40%;
    display: flex;
    justify-content: flex-end;
    margin: 10px;
    align-items: center;  // This centers items vertically within the container
`;

export const NavbarExtenedContainer = styled.div`

`;

export const NavbarInnerContainer = styled.div`
    width: 100%;
    height: 50px;
    display: flex;

`;

export const NavbarLinkContainer = styled.div`
    display: flex;
`;

export const NavbarLink = styled(Link)`
    color: white;
    font-size: large;
    font-family: Arial, Helvetica, sans-serif;
    text-decoration: none;
    margin: 10px;
`;

export const SearchPNG = styled.img`
    margin: 10px;
    max-width: 180px;
    height: 40px;
    vertical-align: middle;  // This ensures the image aligns with the middle of adjacent text or input elements

    &:hover {
        cursor: pointer;
    }
`;

export const SearchInput = styled.input`
    width: 250px;
    height: 30px;   // Adjusted height for a more typical search bar size
    line-height: 30px;  // Ensures text within the input is centered vertically
    padding: 0 10px;  // Removed vertical padding, kept horizontal
    border-radius: 6px;
    border: 1px solid #ccc;
    margin-left: 10px;
    vertical-align: middle;  // This ensures the input aligns with the middle of adjacent text or image element
`;

