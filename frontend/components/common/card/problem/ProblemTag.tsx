import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;

  font-size: 1.8vw;
  color: white;
`

export default function TopBody() {
  return (
    <Container>
      로봇 청소기
    </Container>
  )
}
