import React from "react"

class TextInput extends React.Component {
  state = {
    text: "",
  }

  componentDidMount() {
    let query_text = window.sessionStorage.getItem("query")
    if (query_text) {
      this.setState({ text: query_text })
    }
  }

  updateState = (e) => {
    this.setState({ text: e })
    window.sessionStorage.setItem("query", e)
  }

  onClick = (updatedText) => {
    this.setState({ text: updatedText.target.value })
    this.props.parentCallback(updatedText.target.value)
    window.sessionStorage.setItem("query", updatedText.target.value)
    console.log(window.sessionStorage.getItem("query"))
  }

  render() {
    const { text } = this.state
    return (
      <input
        type="text"
        placeholder={this.props.placeHolderText}
        value={text}
        parentCallback={this.props.parentCallback}
        onChange={this.onClick}
      />
    )
  }
}

export default TextInput
