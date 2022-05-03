import Image from 'next/image'
import Slider from 'react-slick'
import Slide001 from '../../public/carousel/landing/slide_001.jpg'
import Slide002 from '../../public/carousel/landing/slide_002.jpg'
import styled from 'styled-components'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background: #FFC94D;
`

export default function Carousel() {
  const settings = {
    arrows: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    speed: 1000
  }

  return (
    <Container>
      <Slider {...settings}>
        <Image src={Slide001} layout="responsive" alt="landing page carousel slide 001" />
        <Image src={Slide002} layout="responsive" alt="landing page carousel slide 002" />
      </Slider>
    </Container>
  )
}
