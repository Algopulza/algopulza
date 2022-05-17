import Content from '../components/landing/Content'
import Form from '../components/landing/Form'
import styled from 'styled-components'

const Container = styled.section`
  display: grid;
  grid-template-columns: 60vw 40vw;
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
  /* opacity: 90%; */
`

export default function Landing() {
  return (
    <Container>
      <div></div>

      <Subcontainer>
        <FormArea>
          <Content />
          <Form />
        </FormArea>
      </Subcontainer>
    </Container>
  )
}
