import Carousel from '../components/landing/Carousel'
import styled from 'styled-components'

const Container = styled.section`
  display: grid;
  grid-template-columns: 60vw 40vw;
  height: 100vh;
`

export default function Landing() {
  return (
    <Container>
      <Carousel />
    </Container>
  )
}
