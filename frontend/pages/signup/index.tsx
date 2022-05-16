import Routing from "../../components/signup/Routing"
import Content from "../../components/signup/Content"
import Form from "../../components/signup/Form"
import styled from "styled-components"

const Container = styled.section`
  display: flex;
  justify-content: center;
  height: 100vh;
  background: #FFC94D;
`

const Subcontainer = styled.div`
  display: grid;
  grid-template-rows: 7vh 8vh 85vh;
  width: 40vw;
  height: 100vh;
  background: #FFFFFF;
`

export default function Signup() {
  return (
    <Container>
      <Subcontainer>
        <Routing />
        <Content />
        <Form />
      </Subcontainer>
    </Container>
  )
}
