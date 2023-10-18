//A bundling of the button & textinput components needed to allow the text input to be passed to the button
import React from "react"
import Button from "./button"
import TextInput from "./textinput"
import { Link } from "react-router-dom"

class SearchBar extends React.Component {
  state = {
    query: "",
  }

  handleCallback = (data) => {
    this.setState({ query: data })
  }

  render() {
<<<<<<< Updated upstream
    const { query } = this.state
=======
    const { _query } = this.state;
>>>>>>> Stashed changes
    return (
      <div>
        <TextInput
          placeHolderText="Search..."
          parentCallback={this.handleCallback}
        />
        <Link to="/filter">
          <Button type="button" buttonText="Search" className="search_button" />
        </Link>
      </div>
    )
  }
}

export default SearchBar
