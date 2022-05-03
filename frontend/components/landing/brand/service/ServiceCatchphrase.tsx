import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  flex-direction: column;
`

const Text = styled.p`
  margin: 0;
  line-height: 2;

  text-align: center;
  font-size: 1.7vw;
  color: #616161;
`

export default function ServiceCatchphrase() {
  return (
    <Container>
      <Text>개발자라면 알고리즘 풀이역량은 필수!</Text>
      <Text>막 풀지 말고, 알고 풀자</Text>
    </Container>
  )
}
