import Carousel from '../components/landing/Carousel'
import Content from '../components/landing/Content'
import Form from '../components/landing/Form'
import styled from 'styled-components'

const Container = styled.section`
  display: grid;
  grid-template-columns: 60vw 40vw;
  height: 100vh;
`

const Subcontainer = styled.div`
  display: grid;
  grid-template-rows: 50vh 50vh;
`

export default function Landing() {
  return (
    <Container>
      <Carousel />

      <Subcontainer>
        <Content />
        <Form />
      </Subcontainer>
    </Container>
  )
}
