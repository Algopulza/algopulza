import { ToastContainer } from 'react-toastify'
import Carousel from '../components/landing/Carousel'
import Content from '../components/landing/Content'
import Form from '../components/landing/Form'
import styled from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { showToast } from '../components/common/alert/Alert'
import { GetServerSideProps } from 'next'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '../util/stateCollection'

const Container = styled.section`
  display: grid;
  grid-template-columns: 40vw 10vw 40vw 10vw;
  height: 100vh;
  background: #282828;
`

const Subcontainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const FormArea = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  width: 25vw;
  height: 75vh;
  padding: 5vh 0;
  border-radius: 5px;
  background: #FFFFFF;
`

export default function Landing() {
  const router = useRouter()

  // useEffect(() => {
  //   if (window.localStorage.getItem('recoil-persist') !== null) {
  //     showToast('로그인 중입니다!')
  //     router.push('/recommendation')
  //   }
  // }, [])

  return (
    <>
      <Container>
        <Subcontainer>
          <FormArea>
            <Content />
            <Form />
          </FormArea>
        </Subcontainer>

        <div></div>

        <Carousel />

        <div></div>
        
      </Container>
      <ToastContainer limit={1} style={{ width: '25vw', fontSize: '1.1vw', color: '#282828' }} />
    </>
  )
}
