import React, { Component } from "react"
import styled from "styled-components"

const StyledCheckbox = styled.input.attrs({ type: "checkbox" })``

class CheckBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
    }
  }

  handleChange = () => {
    this.setState({ checked: !this.state.checked })
  }

  render() {
    return (
      <div>
        <label>
          <StyledCheckbox
            checked={this.state.checked}
            onChange={this.handleChange}
          />
          <span> {this.props.text} </span>
        </label>
      </div>
    )
  }
}

export default CheckBox
