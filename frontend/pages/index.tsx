import Carousel from '../components/landing/Carousel'
import Brand from '../components/landing/Brand'
import styled from 'styled-components'

const Container = styled.section`
  display: grid;
  grid-template-columns: 60vw 40vw;
  height: 92vh;
`

export default function Landing() {
  return (
    <Container>
      <Carousel />
      <Brand />
    </Container>
  )
}
