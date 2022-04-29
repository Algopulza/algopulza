import { ReactElement } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import styled from 'styled-components'

const Container = styled.section`
  height: 588vh;
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
      <Footer />
    </>
  )
}
