import { useState } from 'react'
import BrandName from './BrandName'
import NavItem from './NavItem'
import styled from 'styled-components'

const Container = styled.section`
  display: grid;
  grid-template-columns: 30vw 40vw 30vw;
  align-items: center;
  height: 8vh;
`

const Pages = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
`

export type NavItemAttr = { item: string, url: string }
const navItems = [
  { item: '추천', url: '/recommendation' },
  { item: '랜덤', url: '/random' },
  { item: '검색', url: '/search' },
  { item: '분석', url: '/analysis' }
]

export default function NavBar() {
  const [isLocated, setIsLocatd] = useState('/recommendation')
  const clickHandler = (path: string) => setIsLocatd(path)

  return (
    <Container>
      <BrandName />

      <Pages>
        {navItems.map(navItem =>
          <NavItem key={navItem.item} navItem={navItem} isLocated={isLocated} onClick={clickHandler} />)
        }
      </Pages>
    </Container>
  )
}
