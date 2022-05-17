import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 15vh;
  padding: 0 3.5vw;
`

const Text = styled.p`
  margin: 0;
  font-size: 1.1vw;
  color: #FFFFFF;
`

const Title = styled.p`
  margin: 0;
  font-size: 2vw;
  color: #FFFFFF;
`

export default function GiftDescription() {
  return (
    <Container>
      <Text>문제를 고르는 것마저 귀찮은 당신을 위한 선물</Text>
      <Title>하루 한 문제 습관 들이기!</Title>
    </Container>
  )
}
