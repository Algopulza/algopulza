import Problem from './card/Problem'
import ProblemInfo from './card/ProblemInfo'
import styled from 'styled-components'

const Container = styled.section`
  width: 17vw;
  height: 200px;
  background: #FFFFFF;
  border-radius: 15px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
`

export default function Card() {
  return (
    <Container>
      <Problem />
      <ProblemInfo />
    </Container>
  )
}
