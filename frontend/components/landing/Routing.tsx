import ButtonStranger from '../common/button/ButtonSubmitting'
import ButtonSignup from '../common/button/ButtonToggling'
import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  justify-content: end;
  align-items: center;
  height: 10vh;
`

export default function Tab() {
  return (
    <Container>
      <ButtonStranger />
      <ButtonSignup />
    </Container>
  )
}
