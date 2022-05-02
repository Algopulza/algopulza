import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
// images
import RecommendCarousel1 from "assets/img/landing_img.png";

const Container = styled.div`
  width: 100%;
`;

const Img = styled.img`
  width: 100%;
`;

// infinite: 무한 display
// autoplaySpeed: 전환 주기
// speed: 전환 속도
const LandingCarousel = () => {
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    touchMove: true,
  };

  return (
    <Container>
      <Slider {...settings}>
        <a href="/analysis"> <Img src={RecommendCarousel1} alt="이미지1" /> </a>
      </Slider>
    </Container>
  );
};

export default LandingCarousel;