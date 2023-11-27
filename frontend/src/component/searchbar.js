import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

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
      <div>
        <input
          type="text"
          placeholder={this.props.placeHolderText}
          value={query}
          onChange={this.onClick}
          onKeyDown={this.handleEnterKeyPress}
        />
        <Link to="/filter">
          <button
            type="button"
            className="search_button"
            onClick={this.handleButtonClick}
          >
            {"Search"}
          </button>
        </Link>
      </div>
    )
  }
}

SearchBar.propTypes = {
  placeHolderText: PropTypes.string,
}

export default SearchBar
