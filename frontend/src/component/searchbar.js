import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import styled from "styled-components"

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Input = styled.input`
  /* Add any additional styling for the input */
`

const SearchButton = styled.button`
  /* Add any additional styling for the button */
`

class SearchBar extends Component {
  state = {
    query: "",
  }

  componentDidMount() {
    let query_text = window.sessionStorage.getItem("query")
    if (query_text) {
      this.setState({ query: query_text })
    }
  }

  updateState = (e) => {
    this.setState({ query: e })
    window.sessionStorage.setItem("query", e)
  }

  onClick = (e) => {
    const updatedText = e.target.value
    this.setState({ query: updatedText })
    this.updateState(updatedText)
    console.log(window.sessionStorage.getItem("query"))
  }

  handleButtonClick = () => {
    const currentUrl = window.location.href
    const endIndex = currentUrl.lastIndexOf("/")
    if (
      endIndex >= 0 &&
      currentUrl.slice(endIndex, currentUrl.length) === "/filter"
    ) {
      window.location.reload(true)
    }
  }

  handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleButtonClick()
    }
  }

  render() {
    const { query } = this.state

    return (
      <SearchBarContainer>
        <Input
          type="text"
          placeholder={this.props.placeHolderText}
          value={query}
          onChange={this.onClick}
          onKeyDown={this.handleEnterKeyPress}
        />
        <Link to="/filter">
          <SearchButton type="button" onClick={this.handleButtonClick}>
            {"Search"}
          </SearchButton>
        </Link>
      </SearchBarContainer>
    )
  }
}

SearchBar.propTypes = {
  placeHolderText: PropTypes.string,
}

export default SearchBar
