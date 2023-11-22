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

let key = 0

class MediaGrid extends Component {
  state = {
    startIndex: 0,
    itemsPerPage: 20,
  }

  handleNextClick = () => {
    this.setState(
      (prevState) => ({
        startIndex: prevState.startIndex + prevState.itemsPerPage,
      }),
      () => window.scrollTo(0, 0) // Scroll to the top after updating state
    )
  }

  handlePrevClick = () => {
    this.setState(
      (prevState) => ({
        startIndex: Math.max(0, prevState.startIndex - prevState.itemsPerPage),
      }),
      () => window.scrollTo(0, 0) // Scroll to the top after updating state
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

      return data.poster
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const { mediaData } = this.props
    const { startIndex, itemsPerPage } = this.state
    const visibleItems = mediaData.slice(startIndex, startIndex + itemsPerPage)

    return (
      <MainContainer>
        <GridContainer>
          {visibleItems.map((mediaItem) => (
            <MediaPoster
              key={key++}
              title={mediaItem.title}
              synopsis={mediaItem.url}
              nameSpace={mediaItem.ns}
              posterUrl={
                this.checkTMDB(mediaItem.ns)
                  ? this.fetchImage(mediaItem.title)
                  : null
              }
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
            disabled={startIndex + itemsPerPage >= mediaData.length}
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
