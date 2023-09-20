// Homepage for UGMRA / Search page (First screen)
import React from "react";
import TextInput from "../component/textinput";
import Button from "../component/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="App">
        {TextInput("Search...")} {Button("Search", () => {window.location.href = "/filter"})} 
      </div>
    </>
  );
};

export default Home;
