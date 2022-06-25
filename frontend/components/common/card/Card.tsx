import ProblemName from './ProblemName'
import ProblemInfo from './ProblemInfo'
import styled from 'styled-components'

const Container = styled.section`
  margin-bottom: 30px;
  width: 17vw;
  height: 24vh;
  background: #FFFFFF;
  border-radius: 15px;
  box-shadow: 0px 4px 10px 6px rgba(0, 0, 0, 0.25);
`

type CardProps = {
  key: number
  id: number
  problemId: number
  title: string
  tier: string
  level: number
  accept: number
  bookmark: boolean
}

export default function Card({key, id, problemId, title, tier, level, accept, bookmark}: CardProps) {
  return (
    <Container>
      <ProblemName key={key} title={title} id={id} problemId={problemId} tier={tier} bookmark={bookmark} />
      <ProblemInfo key={key} id={id} tier={tier} level={level} accept={accept} />
    </Container>
  )
}
