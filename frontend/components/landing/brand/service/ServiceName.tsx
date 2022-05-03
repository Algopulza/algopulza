import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 70px;
`

const Title = styled.p`
  margin: 0;
  line-height: 1.2;

  text-align: center;
  font-size: 5vw;
  font-weight: 700;
`

export default function ServiceName() {
  return (
    <Container>
      <Title>알고ㅤ</Title>
      <Title>ㅤ풀자</Title>
    </Container>
  )
}
