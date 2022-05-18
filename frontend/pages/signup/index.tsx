import { ToastContainer } from 'react-toastify'
import Routing from '../../components/signup/Routing'
import Content from '../../components/signup/Content'
import Form from '../../components/signup/Form'
import styled from 'styled-components'
import Carousel from '../../components/landing/Carousel'
import 'react-toastify/dist/ReactToastify.css'

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
  grid-template-rows: 0.3fr 1.7fr 8fr;
  width: 25vw;
  height: 75vh;
  padding: 3vh 0;
  border-radius: 10px;
  background: #FFFFFF;
`

export default function Signup() {
  return (
    <>
      <Container>
        <Subcontainer>
          <FormArea>
            <Routing />
            <Content />
            <Form />
          </FormArea>
        </Subcontainer>

        <div></div>

        <Carousel />

        <div></div>
      </Container>
      <ToastContainer limit={1} style={{ width: '25vw', fontSize: '1.1vw', color: '#282828' }} />
    </>
  )
}
