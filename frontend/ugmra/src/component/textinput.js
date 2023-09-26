import React from "react";

class TextInput extends React.Component {
  state = {
    text: "",
  };

  updateState = (e) => {
    this.setState({text: e});
  };

  onClick = (updatedText) => {
    this.setState({ text: updatedText.target.value })
    this.props.parentCallback(updatedText.target.value)
  }

  render() {
    const { text } = this.state;
    return (
      <input
        type="text"
        placeholder={this.props.placeHolderText}
        value={text}
        parentCallback={this.props.parentCallback}
        onChange={this.onClick}
      />
    );
  }
}

export default TextInput;
