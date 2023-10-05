import React, { Component } from "react"
import styled from "styled-components"
import CheckBox from "./checkbox"

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, 20px);
  gap: 10px;
`

class CheckBoxList extends Component {
  render() {
    return (
      <Container>
        {this.props.checkboxData.map((item) => (
          <CheckBox text={item.text} />
        ))}
      </Container>
    )
  }
}

export default CheckBoxList
