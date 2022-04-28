import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  flex-direction: column;
`

const Text = styled.p`
  margin: 0;
  text-align: center;
  line-height: 2;
  color: #999999;
`

export default function ServiceDescription() {
  return (
    <Container>
      <Text>알고리즘 문제풀이 능력은 필수</Text>
      <Text>막 풀지 말고 알고 푸세요</Text>
      <Text>저희가 알려드릴게요</Text>
    </Container>
  )
}
