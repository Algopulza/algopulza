import ButtonRouting from '../common/button/ButtonRouting'
import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  justify-content: end;
  align-items: center;
  font-size: 0.9vw;
`

export default function Routing() {
  return (
    <Container>
      <ButtonRouting routingAttr={{url: '/', text: '이전으로'}}  />
    </Container>
  )
}
