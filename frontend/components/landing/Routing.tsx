import ButtonRouting from '../common/button/ButtonRouting'
import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export type RoutingAttr = { url: string, text: string }

export default function Routing() {
  return (
    <Container>
      <ButtonRouting routingAttr={{url: '/recommendation', text: '비회원 로그인'}}  />
      <ButtonRouting routingAttr={{url: '/signup', text: '회원 가입'}}  />
    </Container>
  )
}
