//The results/filtering page for UGMRA (second screen)
import React from "react"
import MediaGrid from "../component/mediagrid"
import SearchBar from "../component/searchbar"
import styled from "styled-components"
import CheckboxList from "../component/checkboxlist"

const WrapDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const WhiteText = styled.p`
  color: white;
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
      nonTropeData: null,
      checkboxData: null,
      filterData: [], //Data returned from checkboxlist.js callback (All currently unchecked boxes)
      namespaceData: null,
    }

    this.getUncheckedFilters = this.getUncheckedFilters.bind(this)
  }

  async componentDidMount() {
    // Fetch data from the database when the component mounts and reset filter data
    this.setState({ filterData: [] })
    this.setState({ checkboxData: null })

    await this.fetchDataFromDatabase()
  }

  // Takes in the jsonified database query results and returns a list of the media namespaces in the results (Not tropes) for creating checkboxes
  getFilterOptions(data) {
    let resultList = []

    for (let i = 0; i < data.length; i++) {
      if (
        mediaNamespaces.includes(data[i]["ns"]) &&
        !resultList.includes(data[i]["ns"])
      ) {
        // If the namespaece is a media namespace and is not already in our list
        resultList.push(data[i]["ns"])
      }
    }

    let jsonResult = [{}]
    // Formatting the result as a mappable object
    for (let i = 0; i < resultList.length; i++) {
      jsonResult[i] = {
        id: i,
        label: resultList[i],
      }
    }

    return jsonResult
  }

  async fetchDataFromDatabase() {
    let qText = window.sessionStorage.getItem("query")

    let apiUrl
    // If statement allows the app to function in testing and prod by checking for the .env var REACT_APP_API_URL, which is only present on the testing side
    if (process.env.REACT_APP_API_URL === undefined) {
      const currentUrl = window.location.href // Get the current URL
      const endIndex = currentUrl.lastIndexOf(".app") // Find the last occurrence of ".app"
      const modifiedUrl = (endIndex >= 0 ? currentUrl.slice(0, endIndex + 4) : currentUrl) // If not found, leave URL untouched. 

      apiUrl = `${modifiedUrl}/search?title=${qText}`
    } else {
      apiUrl = `${process.env.REACT_APP_API_URL}search?title=${qText}`
    }

    try {
      const response = await fetch(apiUrl)
      const data = await response.json()
      this.setState({ mediaData: data }) // Set the retrieved data in state
      this.setState({ checkboxData: this.getFilterOptions(data) }) // Set filter options in state
      this.setState({ nonTropeData: this.filterOutTropes(data) })
    } catch (error) {
      console.error("Error fetching data from the database: ", error)
    }
  }

  //Removes all query results that are not in media namespaces
  filterOutTropes(allMediaArray) {
    let result = []

    for (let i = 0; i < allMediaArray.length; i++) {
      if (mediaNamespaces.includes(allMediaArray[i]["ns"])) {
        result.push(allMediaArray[i])
      }
    }

    return result
  }

  // Returns a json object array of all elements that do not contain any of the namespaces in filterList
  filterMediaNamespaces(mediaArray, filterList) {
    let resultArray = []

    for (let i = 0; i < mediaArray.length; i++) {
      let validFlag = true
      for (let k = 0; k < filterList.length; k++) {
        if (mediaArray[i]["ns"] === filterList[k]["label"]) {
          validFlag = false
        }
      }
      if (validFlag) {
        resultArray.push(mediaArray[i])
      }
    }

    return resultArray
  }

  getUncheckedFilters(uncheckedItems) {
    this.setState({ filterData: uncheckedItems }) // [{id: 4, label: 'Ride'}, {id: 5, label: 'Music'}]
  }

  // Called whenever filterdata's state has changed
  componentDidUpdate(prevProps, prevState) {
    try {
      if (prevState.filterData !== this.state.filterData) {
        const result = this.filterMediaNamespaces(
          this.state.nonTropeData,
          this.state.filterData
        )

        if (result) {
          this.setState({ mediaData: null })
          this.setState({ mediaData: result })
        }
      }
    } catch (error) {
      console.log(error)
    }
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
            {mediaData ? (
              <CheckboxList
                items={checkboxData}
                onUncheckedItems={this.getUncheckedFilters}
              />
            ) : (
              <WhiteText>Loading filters...</WhiteText>
            )}
            {mediaData ? (
              <MediaGrid mediaData={mediaData} />
            ) : (
              <WhiteText>Loading results...</WhiteText>
            )}
          </div>
        </WrapDiv>
      </div>
    )
  }
}

export default Filter
