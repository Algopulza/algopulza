import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 13vh;
  padding: 0 4vw;
`

const Text = styled.p`
  margin: 0;
  font-size: 1.1vw;
  color: #7e6427;
`

const Title = styled.p`
  margin: 0;
  font-size: 2.2vw;
  font-weight: 700;
  color: #3c2c06;
`

export default function GiftDescription() {
  return (
    <Container>
      <Text>문제를 고르는 것마저 귀찮은 당신을 위한 선물</Text>
      <Title>하루 한 문제 습관 들이기!</Title>
    </Container>
  )
}
