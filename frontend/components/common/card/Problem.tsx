import ProblemTag from './problem/ProblemTag'
import ProblemName from './problem/ProblemName'
import styled from 'styled-components'

const Container = styled.section`
  height: 130px;
  background: #EC9A00;
  border-radius: 15px 15px 0 0;
`
type CardProps = {
  key: number,
  tags: any,
  id:number,
  title:string,
}

export default function Problem({key, tags, id, title}:CardProps) {
  return (
    <Container>
      <ProblemTag key={key} tags={tags} id={id} />
      <ProblemName key={key} title={title}/>
    </Container>
  )
}
