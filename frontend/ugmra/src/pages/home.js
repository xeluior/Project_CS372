// Homepage for UGMRA / Search page (First screen)
import React from "react";
import TextInput from "../component/textinput";
import Button from "../component/button";
import { useNavigate } from "react-router-dom";
import "../App.css"; 


const Home = () => {
  return (
    <>
      <div className="search">
        {TextInput("Search...")} 
        <Button buttonText="Search" clickEvent={() => { window.location.href = "/filter" }} />
      </div>
    </>
  );
};

export default Home;
