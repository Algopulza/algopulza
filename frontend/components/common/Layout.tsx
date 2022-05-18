import { ToastContainer } from 'react-toastify'
import { ReactElement } from 'react'
import NavBar from './navbar/NavBar'
import 'react-toastify/dist/ReactToastify.css'

type Props = {
  children: ReactElement
}

export default function Layout({ children }: Props) {
  return (
    <>
      <NavBar />
      <main style={{ paddingTop: '8vh' }}>
        {children}
      </main>
      <ToastContainer limit={1} style={{ width: '25vw', fontSize: '1.1vw', color: '#282828' }} />
    </>
  )
}
