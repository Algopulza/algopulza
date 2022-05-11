import { useEffect, useState } from 'react'
import ButtonRouting from '../common/button/ButtonRouting'
import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export type RoutingAttr = { url: string, text: string }

export default function Routing() {
  useEffect(() => {
    setIsLogin(localStorage.getItem('recoil-persist') !== null ? true : false)
  }, [])
  const [isLogin, setIsLogin] = useState(true)

  return (
    <Container>
      {isLogin ? <></> : <ButtonRouting routingAttr={{url: '/signup', text: '회원 가입'}} />}
    </Container>
  )
}
