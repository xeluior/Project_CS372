import React, { Component } from "react"
import styled from "styled-components"
import CheckBox from "./checkbox"

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, 20px);
  gap: 10px;
`

class CheckBoxList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkboxes: [], //array of all of the checkbox values and if they are checked or not
    }
  }

  handleCallback = (checkbox) => {
    const { checkboxes } = this.state;
  
    const updatedCheckboxes = [...checkboxes];
  
    const existingIndex = checkboxes.findIndex((c) => c.id === checkbox.id);
  
    if (existingIndex === -1) {
      updatedCheckboxes.push(checkbox);
    } else {
      updatedCheckboxes[existingIndex] = checkbox;
    }
  
    this.setState({ checkboxes: updatedCheckboxes }, () => {
      console.log(this.state.checkboxes);
    });
  }
  

  render() {
    return (
      <Container>
        {this.props.checkboxData.map((item) => (
          <CheckBox boxID={item['id']} text={item.text} parentCallback={this.handleCallback} />
        ))}
      </Container>
    )
  }
}

export default CheckBoxList
