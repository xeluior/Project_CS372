import React, { Component } from "react"
import styled from "styled-components"

// These styled components were created by ChatGPT
const Container = styled.div`
  width: 250px;
  height: 375px;
  position: relative;
  overflow: hidden;
  border: 1px solid #ccc;
  cursor: pointer;
`

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
`

const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
`

const Title = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  text-align: center;
`

const Synopsis = styled.p`
  margin: 0;
  font-size: 1rem;
  text-align: center;
`
// End ChatGTP generated code

class MediaPoster extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHovered: false,
    }
  }

  handleMouseEnter = () => {
    this.setState({ isHovered: true })
  }

  handleMouseLeave = () => {
    this.setState({ isHovered: false })
  }

  render() {
    const { isHovered } = this.state
    const { title, synopsis, posterUrl } = this.props

    return (
      <Container
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <ImageContainer>
          <PosterImage src={posterUrl} alt={title} />
        </ImageContainer>
        <Overlay style={{ opacity: isHovered ? 1 : 0 }}>
          <Title>{title}</Title>
          <Synopsis>{synopsis}</Synopsis>
        </Overlay>
      </Container>
    )
  }
}

export default MediaPoster
