import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.p`
  margin: 0;
  line-height: 2;
  color: #999999;
`

export default function ServiceDescription() {
  return (
    <Container>
      <Title>알고리즘 문제풀이 능력은 필수</Title>
      <Title>막 풀지 말고 알고 푸세요</Title>
      <Title>저희가 알려드릴게요</Title>
    </Container>
  )
}
