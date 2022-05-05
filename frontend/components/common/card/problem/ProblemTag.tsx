import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
  padding: 1vw 1vw 0vw 1vw;

  font-size: 1vw;
  color: white;
`

const Tags = styled.div`
    display: flex;
    align-items: center;
`
type CardProps = {
  key: number,
  tags: any,
  id:number,
}

export default function ProblemTag({key, tags, id}:CardProps) {
  return (
    <Container>
      <Tags>
        <span style={{marginRight: 5}}>#구현</span>
        <span style={{marginRight: 5}}>#시뮬레이션</span>
      </Tags>
      
      <span>{id}</span>
    </Container>
  )
}
