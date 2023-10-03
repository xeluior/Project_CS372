//The results/filtering page for UGMRA (second screen)
import React from "react"
import MediaGrid from "../component/mediagrid"
import SearchBar from "../component/searchbar"
import FilterBox from "../component/filterbox"
import styled from "styled-components"

const Filter = () => {
  var mediaData = [
    //An array of testing values. This will be replaced with a database call that returns a JSON object later
    {
      id: 1,
      title: "Cars 2",
      synopsis: "A movie about cars",
      posterUrl:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/iwKVo3HlsyVNXCzFEkd0xHz3kGi.jpg",
    },
    {
      id: 1,
      title: "Cars 3",
      synopsis: "A movie about even more cars",
      posterUrl:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/iwKVo3HlsyVNXCzFEkd0xHz3kGi.jpg",
    },
    {
      id: 1,
      title: "Cars 3",
      synopsis: "A movie about even more cars",
      posterUrl:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/iwKVo3HlsyVNXCzFEkd0xHz3kGi.jpg",
    },
    {
      id: 1,
      title: "Cars 3",
      synopsis: "A movie about even more cars",
      posterUrl:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/iwKVo3HlsyVNXCzFEkd0xHz3kGi.jpg",
    },
    {
      id: 1,
      title: "Cars 3",
      synopsis: "A movie about even more cars",
      posterUrl:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/iwKVo3HlsyVNXCzFEkd0xHz3kGi.jpg",
    },
  ]

  var checkboxData = [
    {
      id: 1,
      text: "Filter 1",
    },
    {
      id: 2,
      text: "Filter 2",
    },
    {
      id: 2,
      text: "Filter 3",
    },
    {
      id: 2,
      text: "Filter 4",
    },
    {
      id: 2,
      text: "Filter 5",
    },
    {
      id: 2,
      text: "Filter 6",
    },
  ]

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
          <MediaGrid mediaData={mediaData} />
        </div>
      </WrapDiv>
    </div>
  )
}

export default Filter
