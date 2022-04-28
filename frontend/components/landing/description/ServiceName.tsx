import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.p`
  margin: 0;
  font-size: 5vw;
  font-weight: 700;
  line-height: 1.3;
`

export default function ServiceName() {
  return (
    <Container>
      <Title>알고ㅤ</Title>
      <Title>ㅤ풀자</Title>
    </Container>
  )
}
