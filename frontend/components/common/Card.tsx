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

type CardProps = {
  id:number,
  title:string,
  tier: string,
  level: number,
  accept: number
}

export default function Card({id, title, tier, level, accept}: CardProps) {
  const handleClick = () => {
    const problemUrl = `https://www.acmicpc.net/problem/${id}`
    window.open(problemUrl)
  }

  return (
    <Container onClick={handleClick}>
      {/* <Problem key={key} tags={tags} id={id} title={title}/> */}
      {/* <ProblemInfo key={key} level={level} name={name} average={average} accept={accept} /> */}
    </Container>
  )
}