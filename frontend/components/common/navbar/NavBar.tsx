import { useEffect, useState } from 'react'
import Brand from './Brand'
import NavItem from './NavItem'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { pageState } from '../../../util/stateCollection'

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
    setIsLogin(localStorage.getItem('recoil-persist') !== null ? true : false)
  }, [])
  const [page, setPage] = useRecoilState(pageState)
  const clickHandler = (path: string) => setPage(path)
  const [isLogin, setIsLogin] = useState(true)

  return (
    <Container>
      <Brand />

      <Pages>
        {isLogin ?
          <NavItem navItemAttr={{item: '추천', url: '/recommendation'}} isLocated={page} onClick={clickHandler} /> :
          <></>
        }
        <NavItem navItemAttr={{item: '랜덤', url: '/random'}} isLocated={page} onClick={clickHandler} />
        <NavItem navItemAttr={{item: '검색', url: '/search'}} isLocated={page} onClick={clickHandler} />
        {isLogin ?
          <NavItem navItemAttr={{item: '분석', url: '/analysis'}} isLocated={page} onClick={clickHandler} /> :
          <></>
        }
      </Pages>
    </Container>
  )
}
