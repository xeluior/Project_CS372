import React, { Component } from "react"
import styled from "styled-components"
import CheckBoxList from "./checkboxlist"

const WrapDiv = styled.div`
  width: auto;
  position: relative;
`

const SideDiv = styled.div`
  width: 30%; //mayeb val instead
  float: left;
  border-style: solid;
`

class FilterBox extends Component {

  render() {
    const { leftContent, centerContent, rightContent } = this.props // Each prop is a JSON obj of the filter names

    return (
      <WrapDiv>
        <SideDiv>
          <CheckBoxList checkboxData={leftContent} /> 
        </SideDiv>
        <SideDiv>
          <CheckBoxList checkboxData={centerContent} />
        </SideDiv>
        <SideDiv>
          <CheckBoxList checkboxData={rightContent} />
        </SideDiv>
      </WrapDiv>
    )
  }
}

export default FilterBox
