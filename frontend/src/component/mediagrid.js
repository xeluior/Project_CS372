import React, { Component } from "react"
import styled from "styled-components"
import MediaPoster from "./mediaposter"
import PropTypes from "prop-types"

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 400px;
  gap: 20px;
  flex: 1;
  overflow: auto;
`

let key = 0

class MediaGrid extends Component {
  state = {
    startIndex: 0,
    itemsPerPage: 20,
  }

  handleNextClick = () => {
    this.setState((prevState) => ({
      startIndex: prevState.startIndex + prevState.itemsPerPage,
    }))
  }

  handlePrevClick = () => {
    this.setState((prevState) => ({
      startIndex: Math.max(0, prevState.startIndex - prevState.itemsPerPage),
    }))
  }

  render() {
    const { mediaData } = this.props
    const { startIndex, itemsPerPage } = this.state
    const visibleItems = mediaData.slice(startIndex, startIndex + itemsPerPage)

    return (
      <GridContainer>
        {visibleItems.map((mediaItem) => (
          <MediaPoster
            key={key++}
            title={mediaItem.title}
            synopsis={mediaItem.url}
            posterUrl={mediaItem.posterUrl} // Remove quotes around mediaItem.posterUrl
          />
        ))}
        <div>
          <button onClick={this.handlePrevClick} disabled={startIndex === 0}>
            Previous
          </button>
          <button
            onClick={this.handleNextClick}
            disabled={startIndex + itemsPerPage >= mediaData.length}
          >
            Next
          </button>
        </div>
      </GridContainer>
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
