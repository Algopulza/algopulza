import styled from 'styled-components'

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 100px;
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

const Title = styled.p`
  margin: 0;
  font-size: 0.9vw;
  color: '#545454';
`

type BodyProps = {
  id: number,
  tier: string,
  level: number,
  accept: number
}

export default function ProblemInfo({ id, tier, level, accept }: BodyProps) {
  return (
    <Container>
      <Item>
        <Title>ID</Title>
        <Title>{id}</Title>
      </Item>

      <Item>
        <Title>TIER</Title>
        <Title>{tier + ' ' + level.toString()}</Title>
      </Item>

      <Item>
        <Title>SOL</Title>
        <Title>{accept.toLocaleString('ko-KR')}</Title>
      </Item>
    </Container>
  )
}
