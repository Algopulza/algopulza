import Image from 'next/image'
import Slider from 'react-slick'
import CarouselImg001 from '../../public/images/carousel_recommendation_001.jpg'
import CarouselImg002 from '../../public/images/carousel_recommendation_002.jpg'
import CarouselImg003 from '../../public/images/carousel_recommendation_003.jpg'
import CarouselImg004 from '../../public/images/carousel_recommendation_004.jpg'
import styled from 'styled-components'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 80px;
  height: 53vh;
  background: #FFC94D;
`

export default function Carousel() {
  const settings = {
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
  }

  return (
    <Container>
      <Slider {...settings}>
        <Image src={CarouselImg001} layout="responsive" alt="Carousel Image at Recommendation Page 001" />
        <Image src={CarouselImg002} layout="responsive" alt="Carousel Image at Recommendation Page 002" />
        <Image src={CarouselImg003} layout="responsive" alt="Carousel Image at Recommendation Page 003" />
        <Image src={CarouselImg004} layout="responsive" alt="Carousel Image at Recommendation Page 004" />
      </Slider>
    </Container>
  )
}
