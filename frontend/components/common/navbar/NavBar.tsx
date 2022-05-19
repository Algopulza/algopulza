import Brand from "./Brand"
import NavItem from "./NavItem"
import NavItemMenu from "./NavItemMenu"
import Logout from "./Logout"
import styled from "styled-components"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { pageState } from "../../../util/stateCollection"

const Container = styled.section`
  position: fixed;
  z-index: 999;
  display: grid;
  grid-template-columns: 30vw 40vw 30vw;
  align-items: center;
  height: 8vh;
  background: #282828;
`

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function NavBar() {
  const [page, setPage] = useRecoilState(pageState)
  const clickHandler = (path: string) => setPage(path)

  useEffect(() => {
    clickHandler("/" + window.location.href.split("/").pop())
  }, [])

  return (
    <Container>
      <Brand />

      <Section>
        <NavItem
          navItemAttr={{ page: "추천", url: "/recommendation" }}
          currentUrl={page}
          onClick={clickHandler} />
        <NavItemMenu url="/random" currentUrl={page} onClick={clickHandler} />
        <NavItem
          navItemAttr={{ page: "검색", url: "/search" }}
          currentUrl={page}
          onClick={clickHandler} />
        <NavItem
          navItemAttr={{ page: "마이페이지", url: "/mypage" }}
          currentUrl={page}
          onClick={clickHandler} />
      </Section>

      <Logout />
    </Container>
  )
}