import Image from 'next/image'
import Slider from 'react-slick'
import Slide001 from '../../public/landing/sample_slide_001.jpg'
import Slide002 from '../../public/landing/sample_slide_002.jpg'
import Slide003 from '../../public/landing/sample_slide_003.jpg'
import Slide004 from '../../public/landing/sample_slide_004.jpg'
import styled from 'styled-components'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
        <Image src={Slide003} layout="responsive" alt="landing page carousel slide 003" />
        <Image src={Slide004} layout="responsive" alt="landing page carousel slide 004" />
      </Slider>
    </Container>
  )
}
