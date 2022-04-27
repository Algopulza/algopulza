import { ReactElement } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'

type Props = {
  children: ReactElement
}

export default function Layout({ children }: Props) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  )
}