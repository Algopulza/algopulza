import Brand from './Brand'
import NavItem from './NavItem'
import NavItemMenu from './NavItemMenu'
import Logout from './Logout'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { accessTokenState, pageState } from '../../../util/stateCollection'

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
  const [isLogin, setIsLogin] = useState(true)
  const [page, setPage] = useRecoilState(pageState)
  const accessToken = useRecoilValue(accessTokenState)
  
  const clickHandler = (path: string) => setPage(path)

  useEffect(() => {
    clickHandler('/' + window.location.href.split('/').pop())
    setIsLogin(accessToken !== '' ? true : false)
  }, [])

  return (
    <Container>
      <Brand />

      <Section>
        <NavItem
          navItemAttr={{page: '추천', url: '/recommendation'}}
          currentUrl={page}
          onClick={clickHandler}
          isLogin={isLogin}
        />
        <NavItemMenu url='/random' currentUrl={page} onClick={clickHandler} />
        <NavItem navItemAttr={{page: '검색', url: '/search'}} currentUrl={page} onClick={clickHandler} isLogin={true} />
        <NavItem
          navItemAttr={{page: '마이페이지', url: '/mypage'}}
          currentUrl={page}
          onClick={clickHandler}
          isLogin={isLogin}
        />
      </Section>

      <Logout />
    </Container>
  )
}
