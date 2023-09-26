// Homepage for UGMRA / Search page (First screen)
import React from "react";
import TextInput from "../component/textinput";
import Button from "../component/button";
import SearchBar from "../component/searchbar";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Home = () => {
  return (
    <>
      <div className="search">
        <SearchBar />
      </div>
    </>
  );
};

export default Home;
