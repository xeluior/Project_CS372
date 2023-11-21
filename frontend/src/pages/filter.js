//The results/filtering page for UGMRA (second screen)
import React from "react"
import MediaGrid from "../component/mediagrid"
import SearchBar from "../component/searchbar"
import styled from "styled-components"
import CheckboxList from "../component/checkboxlist"

const FilterContainer = styled.div`
  display: flex;
  gap: 20px;
`

const FiltersSection = styled.div`
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
      mediaCheckboxData: null, // Media namespace filters
      tropeCheckboxData: null, // Trope filters
      mediaFilterData: [], //Data returned from checkboxlist.js callback (All currently unchecked boxes)
      tropeFilterData: [],
      namespaceData: null,
      resultsFound: false, // false if the database hasn't returned anything, true if it has
      searchTimeout: null, // Timer for alerting the user that no results have been found if a threshold is met
    }

    this.getUncheckedTropeFilters = this.getUncheckedTropeFilters.bind(this)
    this.getUncheckedMediaFilters = this.getUncheckedMediaFilters.bind(this)
  }

  async componentDidMount() {
    // Fetch data from the database when the component mounts and reset filter data
    this.setState({ mediaFilterData: [] })
    this.setState({ tropeFilterData: [] })
    this.setState({ mediaCheckboxData: null })
    this.setState({ tropeCheckboxData: null })
    this.setState({ resultsFound: false })

    await this.fetchDataFromDatabase()
  }

  // Takes in the jsonified database query results and returns a list of the media namespaces in the results (Not tropes) for creating checkboxes
  getFilterOptions(data) {
    let newResultList = [{}]
    let nameSpaces = []

    // Getting list of (media) namespaces in the data
    for (let i = 0; i < data.length; i++) {
      let currentNameSpace = data[i]["ns"]
      if (!nameSpaces.includes(currentNameSpace)) {
        nameSpaces.push(currentNameSpace)
      }
    }

    // Getting counts of each media type
    for (let i = 0; i < nameSpaces.length; i++) {
      let currentCount = 0
      for (let k = 0; k < data.length; k++) {
        if (data[k]["ns"] === nameSpaces[i]) {
          currentCount++
        }
      }

      newResultList[i] = { id: i, label: nameSpaces[i], count: currentCount }
    }

    newResultList.sort((a, b) => b.count - a.count)

    return newResultList
  }

  async fetchDataFromDatabase() {
    let qText = window.sessionStorage.getItem("query")

    let apiUrl
    // If statement allows the app to function in testing and prod by checking for the .env var REACT_APP_API_URL, which is only present on the testing side
    if (process.env.REACT_APP_API_URL === undefined) {
      const currentUrl = window.location.href // Get the current URL
      const endIndex = currentUrl.lastIndexOf("/") // Find the last occurrence of "/"
      const modifiedUrl =
        endIndex >= 0 ? currentUrl.slice(0, endIndex) : currentUrl // If not found, leave URL untouched.

      apiUrl = `${modifiedUrl}/search?title=${qText}`
    } else {
      apiUrl = `${process.env.REACT_APP_API_URL}search?title=${qText}`
    }

    try {
      const response = await fetch(apiUrl)
      const data = await response.json()

      if (data.length !== 0) {
        this.setState({ resultsFound: true })
      }

      let filteredData = this.filterOutTropes(data)

      this.setState({ mediaData: filteredData }) // Set the retrieved data in state
      this.setState({ mediaCheckboxData: this.getFilterOptions(filteredData) }) // Set filter options in state (MAY HAVE TO CHANGE BACK TO JUST "data" AS ARG)
      this.setState({ nonTropeData: filteredData })
      this.setState({
        tropeCheckboxData: this.getTropesFromMedia(filteredData),
      })
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

  getUncheckedMediaFilters(uncheckedItems) {
    this.setState({ mediaFilterData: uncheckedItems }) // [{id: 4, label: 'Ride'}, {id: 5, label: 'Music'}]
  }

  getUncheckedTropeFilters(uncheckedItems) {
    this.setState({ tropeFilterData: uncheckedItems }) // [{id: 4, label: 'Ride'}, {id: 5, label: 'Music'}]
  }

  getTropesFromMedia(mediaList) {
    let tropesList = []

    // Get list of all tropes in database results
    for (let i = 0; i < mediaList.length; i++) {
      for (let k = 0; k < mediaList[i]["links"].length; k++) {
        if (mediaList[i]["links"][k]["ns"] === "Main") {
          // If the trope is in main, i.e. is a trope
          if (!tropesList.includes(mediaList[i]["links"][k]["id"])) {
            // If the trope is not already in the list
            tropesList.push(mediaList[i]["links"][k]["id"])
          }
        }
      }
    }
    let jsonResult = [{}]

    console.log("MEDIA", mediaList)

    for (let i = 0; i < tropesList.length; i++) {
      let currentCount = 0
      let currentTrope = tropesList[i]
      for (let k = 0; k < mediaList.length; k++) {
        for (let j = 0; j < mediaList[k]["links"].length; j++) {
          if (mediaList[k]["links"][j]["id"] === currentTrope) {
            currentCount++
            continue
          }
        }
      }

      jsonResult[i] = {
        id: i,
        label: tropesList[i],
        count: currentCount,
      }
    }

    jsonResult.sort((a, b) => b.count - a.count)

    return jsonResult
  }

  // Takes a list of media and a list of tropes and returns an array containing only the media that does not contain any of those tropes
  filterMediaTropes(mediaList, tropesToFilter) {
    let resultArray = []
    let validFlag = true

    let tropeLabels = []
    for (let i = 0; i < tropesToFilter.length; i++) {
      tropeLabels.push(tropesToFilter[i]["label"])
    }

    for (let i = 0; i < mediaList.length; i++) {
      for (let k = 0; k < mediaList[i]["links"].length; k++) {
        if (tropeLabels.includes(mediaList[i]["links"][k]["id"])) {
          validFlag = false
        }
      }
      if (validFlag) {
        resultArray.push(mediaList[i])
      }
      validFlag = true
    }

    return resultArray
  }

  // Called whenever filterdata's state has changed
  componentDidUpdate(prevProps, prevState) {
    if (this.state.mediaData !== null) {
      try {
        if (this.state.searchTimeout && this.state.mediaData.length !== 0) {
          clearTimeout(this.state.searchTimeout)
          this.setState({ searchTimeout: null })
        }
        if (
          prevState.mediaFilterData !== this.state.mediaFilterData ||
          prevState.tropeFilterData !== this.state.tropeFilterData
        ) {
          let result = this.filterMediaNamespaces(
            this.state.nonTropeData,
            this.state.mediaFilterData
          )
          result = this.filterMediaTropes(result, this.state.tropeFilterData) // Removing filtered tropes
          if (result) {
            this.setState({ mediaData: result })
          }
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      if (!this.state.searchTimeout) {
        const searchTimeout = setTimeout(() => {
          alert("No results found for the specified query.")
        }, 20000)

        this.setState({ searchTimeout })
      }
    }
  }

  render() {
    const { mediaData, mediaCheckboxData, tropeCheckboxData, resultsFound } =
      this.state

    return (
      <div>
        <div className="search">
          <SearchBar />
        </div>
        <FilterContainer>
          <FiltersSection>
            <div>
              {mediaData && resultsFound ? (
                <CheckboxList
                  items={mediaCheckboxData}
                  onUncheckedItems={this.getUncheckedMediaFilters}
                />
              ) : (
                <WhiteText>Loading filters...</WhiteText>
              )}
            </div>
            <div>
              {mediaData && resultsFound ? (
                <CheckboxList
                  items={tropeCheckboxData}
                  onUncheckedItems={this.getUncheckedTropeFilters}
                />
              ) : (
                <WhiteText>Loading filters...</WhiteText>
              )}
            </div>
          </FiltersSection>
          {mediaData && resultsFound ? (
            <MediaGrid mediaData={mediaData} />
          ) : (
            <WhiteText>Loading results...</WhiteText>
          )}
        </FilterContainer>
      </div>
    )
  }
}

export default Filter
