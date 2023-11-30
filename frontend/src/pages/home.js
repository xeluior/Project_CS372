import React, { Component } from "react"
import SearchBar from "../component/searchbar"
import "../App.css"
import StaffPicks from "../component/staffpicks"

class Home extends Component {
  render() {
    return (
      <div>
        <div>
          <img src="ugmra-logo.png" />
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
