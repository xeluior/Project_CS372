import React, { Component } from "react"
import styled from "styled-components"

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, 20px);
  gap: 5px;
`
const SideDiv = styled.div`
  width: 20%; //mayeb val instead
  float: left;
  border-style: solid;
`

class CheckboxList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: props.items,
      checkedItems: new Set(props.items.map((item) => item.id)),
    }
  }

  handleCheckboxChange = (itemId) => {
    const { checkedItems } = this.state
    if (checkedItems.has(itemId)) {
      checkedItems.delete(itemId)
    } else {
      checkedItems.add(itemId)
    }
    this.setState({ checkedItems })
    this.handleUncheckedItemsCallback()
  }

  getUncheckedItems = () => {
    const { items, checkedItems } = this.state
    return items.filter((item) => !checkedItems.has(item.id))
  }

  handleUncheckedItemsCallback = () => {
    const uncheckedItems = this.getUncheckedItems()
    this.props.onUncheckedItems(uncheckedItems) // Pass unchecked items to the parent component
  }

  render() {
    const { items, checkedItems } = this.state

    return (
      <SideDiv>
        <Container>
          {items.map((item) => (
            <div key={item.id}>
              <label>
                <input
                  type="checkbox"
                  checked={checkedItems.has(item.id)}
                  onChange={() => this.handleCheckboxChange(item.id)}
                />
                {item.label}
              </label>
            </div>
          ))}
        </Container>
      </SideDiv>
    )
  }
}
export default CheckboxList
