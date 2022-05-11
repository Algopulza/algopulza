import ProblemName from './ProblemName'
import ProblemInfo from './ProblemInfo'
import styled from 'styled-components'

const Container = styled.section`
  margin-bottom: 30px;
  width: 17vw;
  height: 240px;
  background: #FFFFFF;
  border-radius: 15px;
  box-shadow: 0px 4px 10px 6px rgba(0, 0, 0, 0.25);
`

type CardProps = {
  key: number,
  id: number,
  title: string,
  tier: string,
  level: number,
  accept: number
}

export default function Card({key, id, title, tier, level, accept}: CardProps) {
  return (
    <Container>
      <ProblemName key={key} title={title} id={id} tier={tier} />
      <ProblemInfo key={key} id={id} tier={tier} level={level} accept={accept} />
    </Container>
  )
}
