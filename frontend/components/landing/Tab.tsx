import ButtonStranger from '../common/button/ButtonStranger'
import ButtonSignup from '../common/button/ButtonSignup'
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
