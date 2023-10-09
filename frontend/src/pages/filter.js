//The results/filtering page for UGMRA (second screen)
import React, { useState, useEffect } from "react"
import MediaGrid from "../component/mediagrid"
import SearchBar from "../component/searchbar"
import FilterBox from "../component/filterbox"
import styled from "styled-components"

const Filter = () => { 

  let checkboxData = [
    {
      id: 1,
      text: "Filter 1",
    },
    {
      id: 2,
      text: "Filter 2",
    },
    {
      id: 3,
      text: "Filter 3",
    },
    {
      id: 4,
      text: "Filter 4",
    },
    {
      id: 5,
      text: "Filter 5",
    },
    {
      id: 6,
      text: "Filter 6",
    },
  ]

  const [queryText, setQueryText, mediaData, setMediaData] = useState(0)
  // const [] = useRef(0)

  useEffect(() => {
    //On page load
    async function fetchData() {
      setQueryText(window.sessionStorage.getItem("query"))

      let response = await fetch(
        "https://server-e2agagkjxa-uc.a.run.app/search?title=" + queryText
      )
      // mediaData.current = response.json()
      // console.log(mediaData)
      setMediaData(response.json())
    }
    fetchData()
  })

  const WrapDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
  `

  return (
    <div>
      <div className="search">
        <SearchBar />
      </div>
      <WrapDiv>
        <div>
          <FilterBox
            leftContent={checkboxData}
            centerContent={checkboxData}
            rightContent={checkboxData}
          />
        </div>
        <div>
          <MediaGrid mediaData={mediaData} /> {console.log(mediaData)}
        </div>
      </WrapDiv>
    </div>
  )
}

export default Filter
