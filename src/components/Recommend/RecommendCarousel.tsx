import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import styled from "styled-components"
// images
import RecommendCarousel1 from "assets/img/RecommendCarousel1.jpg"
import RecommendCarousel2 from "assets/img/RecommendCarousel2.jpg"
import RecommendCarousel3 from "assets/img/RecommendCarousel3.jpg"
import RecommendCarousel4 from "assets/img/RecommendCarousel4.jpg"

const Container = styled.div`
  margin-bottom: 48px;
  width: 100vw;
  height: 400px;
`

const Img = styled.img`
  width: 100vw;
`

// infinite: 무한 display
// autoplaySpeed: 전환 주기
// speed: 전환 속도
const RecommendCarousel = () => {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    touchMove: true
  }

  return (
    <Container>
      <Slider {...settings}>
        <a href="/analysis"><Img src={RecommendCarousel1} alt="이미지1" /></a>
        <a href="/analysis"><Img src={RecommendCarousel2} alt="이미지2" /></a>
        <a href="/analysis"><Img src={RecommendCarousel3} alt="이미지3" /></a>
        <a href="/analysis"><Img src={RecommendCarousel4} alt="이미지4" /></a>
      </Slider>
    </Container>
  )
}

export default RecommendCarousel
