//The recommend page for UGMRA (second screen)
import React from "react";
import TextInput from "../component/textinput";
import Button from "../component/button";
import "../App.css"; 

const Recommend = () => {
    return (
      <div className="search">
        <div className="top-center">
          {TextInput("Search...")}
          <Button buttonText="Search" clickEvent={() => { window.location.href = "/filter" }} />
        </div>
        <h1>Screen 3</h1>
      </div>
    );
  }
  
  export default Recommend;
  