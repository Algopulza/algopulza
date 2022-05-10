import { useEffect, useState } from 'react'
import Brand from './Brand'
import NavItem from './NavItem'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '../../../util/stateCollection'

const Container = styled.section`
  display: grid;
  grid-template-columns: 30vw 40vw 30vw;
  align-items: center;
  height: 8vh;
`

const Pages = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 80px;
`

export default function NavBar() {
  useEffect(() => {
    const currentUrl = window.location.href.split('/').pop()
    clickHandler('/' + currentUrl)
  }, [])
  const [isLocated, setIsLocated] = useState('')
  const loginStatus = useRecoilValue(accessTokenState) === '' ? false : true
  
  const clickHandler = (path: string) => setIsLocated(path)

  return (
    <Container>
      <Brand />

      <Pages>
        {loginStatus ?
          <NavItem navItemAttr={{item: '추천', url: '/recommendation'}} isLocated={isLocated} onClick={clickHandler} /> :
          <></>
        }
        <NavItem navItemAttr={{item: '랜덤', url: '/random'}} isLocated={isLocated} onClick={clickHandler} />
        <NavItem navItemAttr={{item: '검색', url: '/search'}} isLocated={isLocated} onClick={clickHandler} />
        {loginStatus ?
          <NavItem navItemAttr={{item: '분석', url: '/analysis'}} isLocated={isLocated} onClick={clickHandler} /> :
          <></>
        }
      </Pages>
    </Container>
  )
}
