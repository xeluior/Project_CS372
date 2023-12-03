import React, { useState } from "react";
import {NavbarContainer, LeftContainer, RightContainer, NavbarExtenedContainer, NavbarInnerContainer, NavbarLinkContainer,  NavbarLink, SearchPNG, SearchInput} from "../styles/NavbarStyle";
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
                    <NavbarLink to="/login">Login</NavbarLink>
                    </NavbarLinkContainer>
                </LeftContainer>
                <RightContainer>
                    <SearchPNG src={Image} onClick={toggleSearchBar}></SearchPNG>
                    {isSearchBarOpen && (
                        <SearchInput type="text" placeholder="Search..." />
                    )}
                </RightContainer>
            </NavbarInnerContainer>

            <NavbarExtenedContainer></NavbarExtenedContainer>
            
        </NavbarContainer>
    );
}

export default Navbar;
