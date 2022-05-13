import { useEffect } from 'react'
import Brand from './Brand'
import NavItem from './NavItem'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { pageState } from '../../../util/stateCollection'
import Logout from './Logout'

const Container = styled.section`
  display: grid;
  grid-template-columns: 30vw 40vw 30vw;
  align-items: center;
  height: 8vh;
`

const Pages = styled.div`
  display: flex;
  justify-content: center;
`

export default function NavBar() {
  useEffect(() => {
    const currentUrl = window.location.href.split('/').pop()
    clickHandler('/' + currentUrl)
  }, [])
  const [page, setPage] = useRecoilState(pageState)
  const clickHandler = (path: string) => setPage(path)

  return (
    <Container>
      <Brand />

      <Pages>
        <NavItem navItemAttr={{item: '추천', url: '/recommendation'}} isLocated={page} onClick={clickHandler} />
        <NavItem navItemAttr={{item: '랜덤', url: '/random'}} isLocated={page} onClick={clickHandler} />
        <NavItem navItemAttr={{item: '검색', url: '/search'}} isLocated={page} onClick={clickHandler} />
        <NavItem navItemAttr={{item: '마이페이지', url: '/mypage'}} isLocated={page} onClick={clickHandler} />
      </Pages>

      <Logout />
    </Container>
  )
}
