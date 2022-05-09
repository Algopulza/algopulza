import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'
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
  const tags2 = (tags && tags.slice(0,2))
  return (
    <Container>
      <Tags>
        {tags2 && tags2.map((tag: { name: string}) => <span key={key} style={{marginRight: 5}}>#{tag.name}</span>)}
      </Tags>
      
      <span>{id}</span>
    </Container>
  )
}
