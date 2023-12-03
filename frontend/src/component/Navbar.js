import React, { useState } from "react";
import { NavbarContainer, LeftContainer, RightContainer, NavbarInnerContainer, NavbarLinkContainer, NavbarLink, SearchPNG } from "../styles/NavbarStyle";
import Image from "../assets/Search.png";
import SearchBar from "./searchbar"; // Importing the SearchBar component

function Navbar() {
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

    const toggleSearchBar = () => {
        setIsSearchBarOpen(!isSearchBarOpen);
    };

    return (
        <NavbarContainer>
            <NavbarInnerContainer>
                <LeftContainer>
                    <NavbarLinkContainer>
                      <NavbarLink to="/">Home</NavbarLink>
                      <NavbarLink to="/login">Login</NavbarLink>
                    </NavbarLinkContainer>
                </LeftContainer>
                <RightContainer>
                    <SearchPNG src={Image} onClick={toggleSearchBar}></SearchPNG>
                    {isSearchBarOpen && (
                        <SearchBar placeHolderText="Search..." />
                    )}
                </RightContainer>
            </NavbarInnerContainer>
        </NavbarContainer>
    );
}

export default Navbar;
