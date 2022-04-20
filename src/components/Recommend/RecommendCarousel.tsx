import React, { Component } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RecommendCarousel1 from "assets/img/RecommendCarousel1.jpg"
import RecommendCarousel2 from "assets/img/RecommendCarousel2.jpg"
import RecommendCarousel3 from "assets/img/RecommendCarousel3.jpg"
import RecommendCarousel4 from "assets/img/RecommendCarousel4.jpg"

const Container = styled.div`
  width:100vw;
  height: 240px;
  margin-bottom: 1rem;
`
const Img = styled.img`
  height: 15rem;
`


const RecommendCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    touchMove: true,
  };
  return (
    <Container>
      <Slider {...settings}>
          <Img src={RecommendCarousel1} alt="이미지1" />
          <Img src={RecommendCarousel2} alt="이미지2" />
          <Img src={RecommendCarousel3} alt="이미지3" />
          <Img src={RecommendCarousel4} alt="이미지4" />
      </Slider>
    </Container>
  );
}

export default RecommendCarousel;