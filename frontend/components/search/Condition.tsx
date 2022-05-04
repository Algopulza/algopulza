import Selection from './condition/Selection'
import Window from './condition/Window'
import styled from 'styled-components'

const Container = styled.section`
  background: #FFC94D;
`

export default function Condition() {
  return (
    <Container>
      <Selection />
      <Window />
    </Container>
  )
}
