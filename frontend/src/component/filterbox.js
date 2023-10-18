import React, { Component } from "react"
import styled from "styled-components"
import CheckBoxList from "./checkboxlist"

const WrapDiv = styled.div`
  width: auto;
  position: relative;
`

const SideDiv = styled.div`
  width: 20%; //mayeb val instead
  float: left;
  border-style: solid;
`

class FilterBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkboxes: [], //array of all of the checkbox values and if they are checked or not
    }

    this.handleCallback = this.handleCallback.bind(this)
  }

  handleCallback(data) {
    this.setState({checkboxes: data})
    this.props.passDataToFilter(data)
  }

  render() {
    const { leftContent } = this.props // Each prop is a JSON obj of the filter names

    return (
      <WrapDiv>
        <SideDiv>
          <CheckBoxList checkboxData={leftContent} dataCallback={this.handleCallback} />
        </SideDiv>
      </WrapDiv>
    )
  }
}

export default FilterBox
