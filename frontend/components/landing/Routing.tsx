import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { pageState } from '../../util/stateCollection'
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
    console.log(localStorage.getItem('recoil-persist') !== null ? true : false)
    setIsLogin(localStorage.getItem('recoil-persist') !== null ? true : false)
  }, [])
  const [isLogin, setIsLogin] = useState(true)

  return (
    <Container>
      {isLogin ? <></> : <ButtonRouting routingAttr={{url: '/random', text: '비회원 로그인'}} />}
      <ButtonRouting routingAttr={{url: '/signup', text: '회원 가입'}}  />
    </Container>
  )
}
