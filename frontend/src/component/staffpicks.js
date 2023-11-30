import React, { Component } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import styled from "styled-components"
import MediaPoster from "./mediaposter"

const MovieCarouselContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`
const StaffPicksText = styled.div`
  color: white;
  font-size: 30px;
  text-align: center;
  margin-bottom: 20px;
`

class StaffPicks extends Component {
  render() {
    const staffPicksData = [
      {
        title: "Interstellar",
        synopsis: "",
        ns: "Film",
        url: "https://tvtropes.org/pmwiki/pmwiki.php/Film/Interstellar",
        poster:
          "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      },
      {
        title: "Dune",
        synopsis: "",
        ns: "Film",
        url: "https://tvtropes.org/pmwiki/pmwiki.php/Film/Dune",
        poster:
          "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
      },
      {
        title: "Apocalypse Now",
        synopsis: "",
        ns: "Film",
        url: "https://tvtropes.org/pmwiki/pmwiki.php/Film/ApocalypseNow",
        poster:
          "https://image.tmdb.org/t/p/w500/gQB8Y5RCMkv2zwzFHbUJX3kAhvA.jpg",
      },
      {
        title: "Skinamarink",
        synopsis: "",
        ns: "Film",
        url: "https://tvtropes.org/pmwiki/pmwiki.php/Film/Skinamarink",
        poster:
          "https://image.tmdb.org/t/p/w500/o942912KFh89SGhqWuKXuT0SXzN.jpg",
      },
      {
        title: "The Lighthouse",
        synopsis: "",
        ns: "Film",
        url: "https://tvtropes.org/pmwiki/pmwiki.php/Film/TheLighthouse",
        poster:
          "https://image.tmdb.org/t/p/w500/4SC4cyzHWWzDEdszdxHYPWd32YH.jpg",
      },
      {
        title: "Ghost In The Shell",
        synopsis: "",
        ns: "Anime",
        url: "https://tvtropes.org/pmwiki/pmwiki.php/Anime/GhostInTheShell",
        poster:
          "https://image.tmdb.org/t/p/w500/9gC88zYUBARRSThcG93MvW14sqx.jpg",
      },
      {
        title: "La Casa De Lobo",
        synopsis: "",
        ns: "WesternAnimation",
        url: "https://tvtropes.org/pmwiki/pmwiki.php/WesternAnimation/TheWolfHouse",
        poster:
          "https://image.tmdb.org/t/p/w500/kvgch2e25cd6dWhRJ6G8BCJ1Wcq.jpg",
      },
    ]

    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <div>
        <br></br>
        <StaffPicksText>{"Staff Picks"}</StaffPicksText>
        <MovieCarouselContainer>
          <Slider {...settings}>
            {staffPicksData.map((mediaItem, index) => (
              <MediaPoster
                key={index}
                title={mediaItem.title}
                synopsis={mediaItem.url}
                nameSpace={mediaItem.ns}
                posterUrl={mediaItem.poster}
              ></MediaPoster>
            ))}
          </Slider>
        </MovieCarouselContainer>
      </div>
    )
  }
}

export default StaffPicks
