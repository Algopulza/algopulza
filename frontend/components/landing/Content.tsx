import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const MainText = styled.div`
  margin-bottom: 20px;
  font-size: 3vw;
  color: #282828;
`

const SubText = styled.div`
  font-size: 1.3vw;
  color: #545454;
`

export default function Content() {
  return (
    <Container>
      <MainText>알고풀자</MainText>
      <SubText>막 풀지 말고, 알고 풀자!</SubText>
    </Container>
  )
}
