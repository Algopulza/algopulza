import styled from "styled-components"

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
  color: #ffffff;
`

const Title = styled.p`
  margin: 0;
  font-size: 2vw;
  color: #ffffff;
`

export default function GiftDescription() {
  return (
    <Container>
      <Text>문제 고르기가 어려운 당신을 위한 선물</Text>
      <Title>하루 한 문제 습관 들이기!</Title>
    </Container>
  )
}