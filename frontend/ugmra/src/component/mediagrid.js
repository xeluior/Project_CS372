import React, { Component } from "react"
import styled from "styled-components"
import MediaPoster from "./mediaposter"
// Styled components (unchanged)
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`

class MediaGrid extends Component {
  render() {
    // const { mediaData } = this.props // Accept media data as props

    return (
      <GridContainer>
        {this.props.mediaData.map((mediaItem) => (
          <MediaPoster
            title={mediaItem.title}
            synopsis={mediaItem.synopsis}
            posterUrl={mediaItem.posterUrl}
          />
        ))}
      </GridContainer>
    )
  }
}

export default MediaGrid
