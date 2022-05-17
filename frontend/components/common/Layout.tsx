import { ReactElement } from 'react'
import NavBar from './navbar/NavBar'

type Props = {
  children: ReactElement
}

export default function Layout({ children }: Props) {
  return (
    <>
      <NavBar />
      <main>
        {children}
      </main>
    </>
  )
}
