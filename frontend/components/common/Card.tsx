import Problem from './card/Problem'
import ProblemInfo from './card/ProblemInfo'
import styled from 'styled-components'

const Container = styled.section`
  margin-bottom: 30px;
  width: 17vw;
  height: 210px;
  background: #FFFFFF;
  border-radius: 15px;
  box-shadow: 0px 4px 10px 6px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`

export default function Card() {
  const handleClick = () => {
    const problemUrl = `https://www.acmicpc.net/problem/${14503}`
    window.open(problemUrl)
  }

  return (
    <Container onClick={handleClick}>
      <Problem />
      <ProblemInfo />
    </Container>
  )
}
