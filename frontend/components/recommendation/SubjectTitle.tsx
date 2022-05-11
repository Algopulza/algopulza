import { SubjectAttr } from '../../util/dto'
import styled from 'styled-components'

const Container = styled.section`
  display: flex;
`

const Title = styled.section`
  margin-bottom: 30px;
  margin-right: 10px;
  font-size: 1.8vw;
  font-weight: 700;
`

type SubjectProps = {
  children: SubjectAttr
}

export default function SubjectTitle({ children }: SubjectProps) {
  return (
    <Container>
      <Title>{children.title}</Title>
      <span style={{fontSize: "1.3vw"}}>{children.englishTitle}</span>
    </Container>
  )
}
