import Routing from "../../components/signup/Routing"
import Content from "../../components/signup/Content"
import Form from "../../components/signup/Form"
import styled from "styled-components"

const Container = styled.section`
  display: grid;
  grid-template-columns: 40vw 60vw;
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
  grid-template-rows: 0.5fr 1.5fr 8fr;
  width: 25vw;
  height: 75vh;
  padding: 5vh 0;
  border-radius: 10px;
  background: #FFFFFF;
  /* opacity: 90%; */
`

export default function Signup() {
  return (
    <Container>
      <Subcontainer>
        <FormArea>
          <Routing />
          <Content />
          <Form />
        </FormArea>
      </Subcontainer>
      
      <div></div>
    </Container>
  )
}
