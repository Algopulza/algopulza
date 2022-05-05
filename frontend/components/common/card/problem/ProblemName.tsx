import styled from 'styled-components'

const Title = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 110px;

  font-size: 1.8vw;
  color: white;
`
type CardProps = {
  key: number,
  title:string,
}

export default function ProblemName({key, title}:CardProps) {
  return (
    <Title>{title}</Title>
  )
}
