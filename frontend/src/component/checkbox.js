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

  componentDidMount() {
    this.props.parentCallback({'id': this.props.boxid, 'ns': this.props.text, 'state': this.state.checked})
  }

  handleChange = () => {
    this.setState({ checked: !this.state.checked })
    this.props.parentCallback({'id': this.props.boxid, 'ns': this.props.text, 'state': this.state.checked})
  }

  render() {
    return (
      <div>
        <label>
          <StyledCheckbox
            boxid={this.props.boxID}
            checked={this.state.checked}
            onChange={this.handleChange}
            parentCallback={this.props.parentCallback}
          />
          <span> {this.props.text} </span>
        </label>
      </div>
    )
  }
}

export default CheckBox
