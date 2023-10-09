import React, { Component } from "react"
import styled from "styled-components"
import MediaPoster from "./mediaposter"

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`

class MediaGrid extends Component {
  render() {

    return (
      <GridContainer>
        {this.props.mediaData.map((mediaItem) => (
          <MediaPoster
            title={mediaItem.id}
            synopsis={mediaItem.id}
            posterUrl={"mediaItem.posterUrl"}
          />
        ))}
      </GridContainer>
    )
  }
}

export default MediaGrid
