import styled from 'styled-components'

const Container = styled.section`
  padding: 20px 3vw;
  color: #FFFFFF;
`

const Text = styled.p`
  margin: 0;
`

const Title = styled.p`
  margin: 0;
  padding: 5px 0;
  font-size: 2.8vw;
`

export default function GiftDescription() {
  return (
    <Container>
      <Text>문제를 고르는 것마저 귀찮은 당신을 위한 선물</Text>
      <Title>하루 한 문제 습관 들이기!</Title>
    </Container>
  )
}
