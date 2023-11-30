import React, { Component } from "react";
import SearchBar from "../component/searchbar";
import "../App.css";

class Home extends Component {
  render() {
    return (
      <div>
        <div className="search">
          <SearchBar />
        </div>
      </div>
    );
  }
}

export default Home;
