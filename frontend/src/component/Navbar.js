// Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  NavbarLink,
  SearchPNG,
  SearchInput,
  LogoutButton,
} from "../styles/NavbarStyle";
import Image from "../assets/Search.png";

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
                        <NavbarLink to="/recommend">Recommend</NavbarLink>
                        <NavbarLink to="/login">Login</NavbarLink>
                    </NavbarLinkContainer>
                </LeftContainer>
                <RightContainer>
                    <SearchPNG src={Image} onClick={toggleSearchBar}></SearchPNG>
                    {isSearchBarOpen && (
                        <SearchInput type="text" placeholder="Search..." />
                    )}
                    <LogoutButton as={Link} to="/logout">Logout</LogoutButton>
                </RightContainer>
            </NavbarInnerContainer>
        </NavbarContainer>
    );
}

export default Navbar;