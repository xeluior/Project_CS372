import React, { Component } from "react"
import styled from "styled-components"

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, 20px);
  gap: 5px;
  max-height: ${(props) => props.maxHeight}px; // Set maximum height dynamically
  overflow-y: auto; // Add a vertical scrollbar when content overflows
  overflow-x: hidden
`
const SideDiv = styled.div`
  width: 275px; // maybe a value instead
  float: left;
  border-style: solid;
`

const SearchBar = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  margin-bottom: 10px;
`

const CheckboxLabel = styled.label`
  color: white;
`

class CheckboxList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: props.items,
      checkedItems: new Set(props.items.map((item) => item.id)),
      searchTerm: "", // State to hold the search term
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

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value.toLowerCase() }) // Update the search term
  }

  getFilteredItems = () => {
    const { items, searchTerm } = this.state
    return items.filter(
      (item) => item.label.toLowerCase().includes(searchTerm) // Filter based on the search term
    )
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
    const { checkedItems } = this.state
    const filteredItems = this.getFilteredItems()

    const maxHeight = Math.min(filteredItems.length * 25, 675)

    return (
      <SideDiv>
        <SearchBar
          type="text"
          placeholder="Search..."
          onChange={this.handleSearch}
        />
        <Container maxHeight={maxHeight}>
          {filteredItems.map((item) => (
            <div key={item.id}>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={checkedItems.has(item.id)}
                  onChange={() => this.handleCheckboxChange(item.id)}
                />
                {item.label + " (" + item.count + ")"}
              </CheckboxLabel>
            </div>
          ))}
        </Container>
      </SideDiv>
    )
  }
}
export default CheckboxList
