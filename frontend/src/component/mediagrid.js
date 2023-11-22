import React, { Component } from "react"
import styled from "styled-components"
import MediaPoster from "./mediaposter"
import PropTypes from "prop-types"
import axios from "axios"

const MainContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 10px;
  flex: 1;
  overflow: hidden;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 400px;
  gap: 20px;
`

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`

const StyledButton = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  max-height: 40px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: #45a049;
  }

  &:first-child {
    margin-right: 10px;
  }
`

// let key = 0

class MediaGrid extends Component {
  state = {
    startIndex: 0,
    itemsPerPage: 20,
    posterUrls: [], // New state to store fetched poster URLs
  }

  async fetchData(startIndex, endIndex) {
    const { mediaData } = this.props

    try {
      const posterUrls = await Promise.all(
        mediaData.slice(startIndex, endIndex).map(async (mediaItem) => {
          if (this.checkTMDB(mediaItem.ns)) {
            return await this.fetchImage(mediaItem.title)
          }
          return null
        })
      )
      this.setState((prevState) => ({
        posterUrls: [
          ...prevState.posterUrls.slice(0, startIndex),
          ...posterUrls,
          ...prevState.posterUrls.slice(endIndex),
        ],
      }))
    } catch (error) {
      console.error("Error fetching poster URLs:", error)
    }
  }

  componentDidMount() {
    const { startIndex, itemsPerPage } = this.state
    this.fetchData(startIndex, startIndex + itemsPerPage)
  }

  handleNextClick = () => {
    this.setState(
      (prevState) => ({
        startIndex: prevState.startIndex + prevState.itemsPerPage,
      }),
      () => {
        const { startIndex, itemsPerPage } = this.state
        this.fetchData(startIndex, startIndex + itemsPerPage) // Fetch new data when moving to the next page
        window.scrollTo(0, 0) // Scroll to the top after updating state
      }
    )
  }

  handlePrevClick = () => {
    this.setState(
      (prevState) => ({
        startIndex: Math.max(0, prevState.startIndex - prevState.itemsPerPage),
      }),
      () => {
        const { startIndex, itemsPerPage } = this.state
        this.fetchData(startIndex, startIndex + itemsPerPage) // Fetch new data when moving to the previous page
        window.scrollTo(0, 0) // Scroll to the top after updating state
      }
    )
  }

  // Checks if the namespace corresponds to a category that might be in the TMDB for getting images
  checkTMDB = (mediaNS) => {
    let validNameSpaces = [
      "Film",
      "Animation",
      "Anime",
      "Franchise",
      "WesternAnimation",
    ]
    if (validNameSpaces.includes(mediaNS)) {
      return true
    } else return false
  }

  fetchImage = async (title) => {
    try {
      const response = await axios.get(`/meta/movie?title=${title}`)
      const data = response.data

      if (!data.title) throw new Error("Movie not found")

      console.log("Poster URL: ", data.poster)
      return await data.poster
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const { mediaData } = this.props
    const { startIndex, itemsPerPage, posterUrls } = this.state
    const endIndex = startIndex + itemsPerPage
    const visibleItems = mediaData.slice(startIndex, endIndex)

    return (
      <MainContainer>
        <GridContainer>
          {visibleItems.map((mediaItem, index) => (
            <MediaPoster
              key={index}
              title={mediaItem.title}
              synopsis={mediaItem.url}
              nameSpace={mediaItem.ns}
              posterUrl={posterUrls[startIndex + index]}
            />
          ))}
        </GridContainer>
        <ButtonRow>
          <StyledButton
            onClick={this.handlePrevClick}
            disabled={startIndex === 0}
          >
            Previous
          </StyledButton>
          <StyledButton
            onClick={this.handleNextClick}
            disabled={endIndex >= mediaData.length}
          >
            Next
          </StyledButton>
        </ButtonRow>
      </MainContainer>
    )
  }
}

MediaGrid.propTypes = {
  mediaData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
      posterUrl: PropTypes.string,
    })
  ).isRequired,
}

export default MediaGrid
