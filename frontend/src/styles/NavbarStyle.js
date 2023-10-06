import styled from "styled-components";
import { Link } from "react-router-dom";


export const NavbarContainer = styled.nav`
    width: 100%;
    height: 50px;
    background-color: black;
    display: flex;
    flex-direction: column;
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
    height: 50px;
    vertical-align: middle;  // This ensures the image aligns with the middle of adjacent text or input elements

    &:hover {
        transform: translateY(5px);
    }
`;

export const SearchInput = styled.input`
    width: 300px;
    height: 30px;   // Adjusted height for a more typical search bar size
    line-height: 30px;  // Ensures text within the input is centered vertically
    padding: 0 10px;  // Removed vertical padding, kept horizontal
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-left: 10px;
    vertical-align: middle;  // This ensures the input aligns with the middle of adjacent text or image element
`;

