import { Outlet } from "react-router-dom"
import Navbar from "components/layout/Navbar"
import Footer from "components/layout/Footer"
import styled from "styled-components"

// 랜덤, 카테고리 탭에 아직 내용을 채우지 않았기 때문에
// 일단은 flex와 vh 100을 활용해서 footer를 강제로 아래에 위치시킴
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
