//The results/filtering page for UGMRA (second screen)
import React from "react"
import StylizedMovieCard from "../component/mediaposter"
import MediaGrid from "../component/mediagrid"

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
      title: "Cars 2",
      synopsis: "A movie about cars",
      posterUrl:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/iwKVo3HlsyVNXCzFEkd0xHz3kGi.jpg",
    },
  ]

  return <MediaGrid mediaData={mediaData}></MediaGrid>
}

export default Filter
