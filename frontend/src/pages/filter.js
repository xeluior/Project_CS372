//The results/filtering page for UGMRA (second screen)
import React, { useState, useEffect } from "react"
import MediaGrid from "../component/mediagrid"
import SearchBar from "../component/searchbar"
import FilterBox from "../component/filterbox"
import styled from "styled-components"

const WrapDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      queryText: "",
      mediaData: null,
      checkboxData: null,
    }
  }

  async componentDidMount() {
    // Fetch data from the database when the component mounts
    await this.fetchDataFromDatabase()
  }

  async fetchDataFromDatabase() {
    let qText = window.sessionStorage.getItem("query")

    const apiUrl = `${process.env.REACT_APP_API_URL}search?title=${qText}`
    try {
      // Assuming you are using the fetch API to make a GET request to your database
      const response = await fetch(apiUrl)
      const data = await response.json()
      this.setState({ mediaData: data }) // Set the retrieved data in the state

      // return data
    } catch (error) {
      console.error("Error fetching data from the database:", error)
    }
  }

  render() {
    const { mediaData } = this.state

    return (
      <div>
        <div className="search">
          <SearchBar />
        </div>
        <WrapDiv>
          <div>
            {/* <FilterBox
            leftContent={checkboxData}
            centerContent={checkboxData}
            rightContent={checkboxData}
          /> */}
          </div>
          <div> {console.log(mediaData)}
            {mediaData ? (
              <MediaGrid mediaData={mediaData} /> 
            ) : (
              <p>Loading data...</p>
            )}
          </div>
        </WrapDiv>
      </div>
    )
  }
}

export default Filter
