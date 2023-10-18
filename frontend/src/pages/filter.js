//The results/filtering page for UGMRA (second screen)
import React from "react"
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
      queryResult: null,
      mediaData: null,
      nonTropeData: null,
      checkboxData: null,
      filterData: [],
      namespaceData: null,
    }

    this.passDataToFilter = this.passDataToFilter.bind(this)
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
        text: resultList[i],
      }
    }

    return jsonResult
  }

  async fetchDataFromDatabase() {
    let qText = window.sessionStorage.getItem("query")

    let apiUrl
    // If statement allows the app to function in testing and prod by checking for the .env var REACT_APP_API_URL, which is only present on the testing side
    if (process.env.REACT_APP_API_URL === undefined) {
      apiUrl = `${window.location.href}/search?title=${qText}`
    } else {
      apiUrl = `${process.env.REACT_APP_API_URL}search?title=${qText}`
    }

    console.log("API: ", apiUrl)
    try {
      const response = await fetch(apiUrl)
      const data = await response.json()
      this.setState({ queryResult: data })
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
    let allowedNamespaces = []

    for (let i = 0; i < this.state.checkboxData.length; i++) {
      allowedNamespaces.push({
        ns: this.state.checkboxData[i]["text"],
        state: true,
      }) //Get list of all filter options in format {'ns': music, 'state': true}
    }

    //Cross reference allowedNamespaces with filterList
    for (let i = 0; i < filterList.length; i++) {
      if (filterList[i]["state"] === false) {
        allowedNamespaces.splice([filterList[i]["id"]], 1) //remove element if its state in the filter list is false
      }
    }

    //Cross reference allNameSpaces with mediadata to filter out unwanted data
    let resultArray = []
    for (let i = 0; i < mediaArray.length; i++) {
      let indexFlag = false
      for (let k = 0; k < allowedNamespaces.length; k++) {
        if (mediaArray[i]["ns"] === allowedNamespaces[k]["ns"]) {
          indexFlag = true
        }
      }
      if (indexFlag) {
        resultArray.push(mediaArray[i])
      }
    }
    return resultArray
  }

  // Callback method that goes from filter.js -> filterbox.js -> checkboxlist.js -> checkbox.js to return checkboxes' data
  passDataToFilter(data) {
    this.setState({ filterData: data })
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
              <FilterBox
                passDataToFilter={this.passDataToFilter}
                leftContent={checkboxData}
              />
            ) : (
              <p>Loading filters...</p>
            )}

            {mediaData ? (
              <MediaGrid mediaData={mediaData} />
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
