import ButtonRouting from '../common/button/ButtonRouting'
import ButtonToggling from '../common/button/ButtonToggling'
import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  justify-content: end;
  align-items: center;
`

export default function Routing() {
  return (
    <Container>
      <ButtonRouting />
      <ButtonToggling />
    </Container>
  )
}
