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
// All media related namespaces on the tvtropes site.
let mediaNamespaces = [
  "Advertising",
  "Animation",
  "Anime",
  "ARG",
  "Art",
  "AudoPlay",
  "Blog",
  "ComicBook",
  "ComicStrip",
  "Creator",
  "Fanfic",
  "Film",
  "Franchise",
  "Literature",
  "Magazine",
  "Manga",
  "Manhua",
  "Manhwa",
  "Music",
  "Myth",
  "Pinball",
  "Podcast",
  "Radio",
  "Ride",
  "Roleplay",
  "Script",
  "Series",
  "TabletopGame",
  "Theatre",
  "Toys",
  "VideoGame",
  "VisualNovel",
  "WebAnimation",
  "WebComic",
  "Website",
  "WebOriginal",
  "WebVideo",
  "WesternAnimation",
  "Wrestling",
]

class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      queryText: "",
      mediaData: null,
      checkboxData: null,
      namespaceData: null,
    }
  }

  async componentDidMount() {
    // Fetch data from the database when the component mounts
    await this.fetchDataFromDatabase()
  }

  // Takes in the jsonified database query results and returns a list of the media namespaces in the results (Not tropes)
  getFilterOptions(data)
  {
    let resultList = []

    for (let i = 0; i < data.length; i++)
    {
      if(mediaNamespaces.includes(data[i]['ns']) && !(resultList.includes(data[i]['ns'])))// If the namespaece is a media namespace and is not already in our list
      {
        resultList.push(data[i]['ns'])
      }
    }

    let jsonResult = [{}]

    for (let i = 0; i < resultList.length; i++) // Formatting the result as a mappable object
    {
      jsonResult[i] = 
      {
        id: i,
        text: resultList[i]
      }
    }

    return jsonResult
  }

  async fetchDataFromDatabase() {
    let qText = window.sessionStorage.getItem("query")

    const apiUrl = `${process.env.REACT_APP_API_URL}search?title=${qText}`
    try {
      const response = await fetch(apiUrl)
      const data = await response.json()
      this.setState({ mediaData: data }) // Set the retrieved data in state
      this.setState({checkboxData: this.getFilterOptions(data)}) // Set filter options in state

    } catch (error) {
      console.error("Error fetching data from the database: ", error)
    }
  }

  // Returns a json object array of all elements that do not contain any of the namespaces in filterList
  filterMediaNamespaces(jsonArray, filterList) {
    //NOTE: This list only contains namespaces that hold media, not tropes.
    let allNameSpaces = {
      Advertising: true,
      Animation: true,
      Anime: true,
      ARG: true,
      Art: true,
      AudoPlay: true,
      Blog: true,
      ComicBook: true,
      ComicStrip: true,
      Creator: true,
      Fanfic: true,
      Film: true,
      Franchise: true,
      Literature: true,
      Magazine: true,
      Manga: true,
      Manhua: true,
      Manhwa: true,
      Music: true,
      Myth: true,
      Pinball: true,
      Podcast: true,
      Radio: true,
      Ride: true,
      Roleplay: true,
      Script: true,
      Series: true,
      TabletopGame: true,
      Theatre: true,
      Toys: true,
      VideoGame: true,
      VisualNovel: true,
      WebAnimation: true,
      WebComic: true,
      Website: true,
      WebOriginal: true,
      WebVideo: true,
      WesternAnimation: true,
      Wrestling: true,
    }

    for(let i = 0; i < filterList.length; i++)
    {
      allNameSpaces[filterList[i]] = false // Mark all elements from filterList as false
    }

    let resultArray = []
    let resultArrayIndex = 0

    for(let i = 0; i < jsonArray.length; i++)
    {
      if(allNameSpaces[jsonArray[i]['ns']] === true) // If element from jsonArray is on allowed list (i.e. not in filterList)
      {
        resultArray[resultArrayIndex++] = jsonArray[i]
      }
    }
    console.log(resultArray)
    return resultArray
  }

  render() {
    const { mediaData, checkboxData } = this.state

    return (
      <div>
        <div className="search">
          <SearchBar />
        </div>
        <WrapDiv>
          <div> 
            {mediaData ? ( <FilterBox
            leftContent={checkboxData}
            // centerContent={checkboxData}
            // rightContent={checkboxData}
          />) : <p>Loading filters...</p>}
          
            {mediaData ? (
              <MediaGrid mediaData={this.filterMediaNamespaces(mediaData, [])} /> 
            ) : (
              <p>Loading results...</p>
            )}
          </div>
        </WrapDiv>
      </div>
    )
  }
}

export default Filter
