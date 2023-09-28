//A bundling of the button & textinput components needed to allow the text input to be passed to the button
import React from "react";
import Button from "./button";
import TextInput from "./textinput";

class SearchBar extends React.Component {
  state = {
    query: "",
  };

  handleCallback = (data) => {
    this.setState({ query: data });
  };

  render() {
    const { query } = this.state;
    return (
      <div>
        <TextInput
          placeHolderText="Search..."
          parentCallback={this.handleCallback} 
        />
        <Button
          type="button"
          buttonText="Search"
          className="search_button"
          clickEvent={() => {
            window.location.href = "/filter?q=" + query;
          }}
        />
      </div>
    );
  }
}

export default SearchBar;
