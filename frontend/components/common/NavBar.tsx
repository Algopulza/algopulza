import { useState } from 'react'
import ServiceName from './navbar/ServiceName'
import NavItem from './navbar/NavItem'
import styled from 'styled-components'

const Container = styled.section`
  display: grid;
  grid-template-columns: 30vw 40vw 30vw;
  align-items: center;
  height: 60px;
  background: #1565C0;
`

const Pages = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 60px;
`

export type Route = {
  name: string,
  path: string
}

export default function NavBar() {
  const [routes, setRoutes] = useState<Route[]>([
    { name: '추천', path: '/recommendation' },
    { name: '랜덤', path: '/random' },
    { name: '검색', path: '/list' },
    { name: '분석', path: '/analysis' }
  ])

  return (
    <Container>
      <ServiceName />
      <Pages>
        {routes.map(route => <NavItem key={route.name} route={route} />)}
      </Pages>
      <div />
    </Container>
  )
}
