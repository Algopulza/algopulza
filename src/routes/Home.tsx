import { Outlet } from "react-router-dom"
import Navbar from "components/layout/Navbar"
import Footer from "components/layout/Footer"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: overlay;
`

const Home = () => {
  return (
    <Container>
      <Navbar />
      <Outlet />
      <Footer />
    </Container>
  )
}

export default Home
