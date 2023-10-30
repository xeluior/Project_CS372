import React, { Component } from "react"
import styled from "styled-components"
import MediaPoster from "./mediaposter"
import PropTypes from "prop-types";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`
let key = 0

class MediaGrid extends Component {
  render() {

    return (
      <GridContainer>
        {this.props.mediaData.map((mediaItem) => (
          <MediaPoster
            key={key++}
            title={mediaItem.title}
            synopsis={mediaItem.url}
            posterUrl={"mediaItem.posterUrl"}
          />
        ))}
      </GridContainer>
    )
  }
}

MediaGrid.propTypes = {
  mediaData: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
    posterUrl: PropTypes.string,
  })).isRequired, // Validate mediaData as an array of objects with specific shape
};

export default MediaGrid
