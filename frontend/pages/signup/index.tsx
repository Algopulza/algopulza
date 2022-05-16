import Guide from "../../components/signup/Guide"
import Routing from "../../components/signup/Routing"
import Content from "../../components/signup/Content"
import Form from "../../components/signup/Form"
import styled from "styled-components"

const Container = styled.section`
  display: grid;
  grid-template-columns: 60vw 40vw;
  height: 100vh;
`

const Subcontainer = styled.div`
  display: grid;
  grid-template-rows: 7vh 8vh 85vh;
  height: 100vh;
`

export default function Signup() {
  return (
    <Container>
      <Guide />

      <Subcontainer>
        <Routing />
        <Content />
        <Form />
      </Subcontainer>
    </Container>
  )
}
