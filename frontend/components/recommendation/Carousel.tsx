import Image from 'next/image'
import Slider from 'react-slick'
import Slide001 from '../../public/carousel/recommendation/slide_001.jpg'
import Slide002 from '../../public/carousel/recommendation/slide_002.jpg'
import Slide003 from '../../public/carousel/recommendation/slide_003.jpg'
import styled from 'styled-components'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 80px;
  height: 50vh;
  background: #FFC94D;
`

export default function Carousel() {
  const settings = {
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    speed: 1000
  }

  return (
    <Container>
      <Slider {...settings}>
        <Image src={Slide001} layout="responsive" alt="Carousel Image at Recommendation Page 001" />
        <Image src={Slide002} layout="responsive" alt="Carousel Image at Recommendation Page 002" />
        <Image src={Slide003} layout="responsive" alt="Carousel Image at Recommendation Page 003" />
      </Slider>
    </Container>
  )
}
