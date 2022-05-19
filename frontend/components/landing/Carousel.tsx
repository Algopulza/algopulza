import Image from "next/image"
import Slider from "react-slick"
import IntroImg1 from "../../public/contents/introduction1.png"
import IntroImg2 from "../../public/contents/introduction2.png"
import styled from "styled-components"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default function Carousel() {
  const settings = {
    arrows: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    speed: 1000,
  }

  return (
    <Container>
      <Slider {...settings}>
        <Image src={IntroImg1} layout="responsive" alt="introduction image 001" />
        <Image src={IntroImg2} layout="responsive" alt="introduction image 002" />
      </Slider>
    </Container>
  )
}