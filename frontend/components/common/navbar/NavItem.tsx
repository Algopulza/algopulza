import { Route } from '../NavBar'
import Link from 'next/link'
import styled from 'styled-components'

const Container = styled.section`
  
`

type RouteProps = {
  route: Route
}

export default function NavItem({ route }: RouteProps) {
  const { name, path } = route

  return (
    <Link href={path}><a>{name}</a></Link>
  )
}
