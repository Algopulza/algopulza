import ButtonRouting from '../common/button/ButtonRouting'
import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  justify-content: end;
  align-items: center;
`

export default function Routing() {
  return (
    <Container>
      <ButtonRouting routingAttr={{url: '/', text: '로그인'}}  />
    </Container>
  )
}
