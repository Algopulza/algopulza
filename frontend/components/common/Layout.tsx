import { ReactElement } from 'react'
import NavBar from './NavBar'
import styled from 'styled-components'

const Container = styled.section`
  height: 442vh;
`

type Props = {
  children: ReactElement
}

export default function Layout({ children }: Props) {
  return (
    <>
      <NavBar />
      <main>
        <Container>{children}</Container>
      </main>
    </>
  )
}
