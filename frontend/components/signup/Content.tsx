import styled from "styled-components"

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const MainText = styled.div`
  font-size: 2vw;
  color: #282828;
`

export default function Content() {
  return (
    <Container>
      <MainText>알고풀자</MainText>
    </Container>
  )
}