import Content from '../components/landing/Content'
import Form from '../components/landing/Form'
import styled from 'styled-components'
import Carousel from '../components/landing/Carousel'

const Container = styled.section`
  display: grid;
  grid-template-columns: 40vw 5vw 40vw 15vw;
  height: 100vh;
  background: #282828;
`

const Subcontainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const FormArea = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  width: 25vw;
  height: 75vh;
  padding: 5vh 0;
  border-radius: 10px;
  background: #FFFFFF;
`

export default function Landing() {
  return (
    <Container>
      <Subcontainer>
        <FormArea>
          <Content />
          <Form />
        </FormArea>
      </Subcontainer>

      <div></div>

      <Carousel />

      <div></div>
    </Container>
  )
}
