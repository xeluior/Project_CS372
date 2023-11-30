import React, { Component } from "react"
import SearchBar from "../component/searchbar"
import "../App.css"
import StaffPicks from "../component/staffpicks"
import logo from "./ugmra-logo.png";

class Home extends Component {
  render() {
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <img src={logo} alt="UGMRA Logo" style={{ margin: "auto" }} width="200" height="auto" />
        </div>
        <div className="search">
          <SearchBar />
        </div>
        <div>
          <StaffPicks />
        </div>
      </div>
    )
  }
}

export default Home
