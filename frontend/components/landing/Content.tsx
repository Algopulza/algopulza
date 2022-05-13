import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const BrandName = styled.p`
  margin: 0;
  line-height: 1.2;
  font-size: 5vw;
  font-weight: 700;
`

const BrandCatchphrase = styled.p`
  margin: 0;
  font-size: 1.7vw;
  color: #545454;
`

export default function Content() {
  return (
    <Container>
      <BrandName style={{marginTop: 30}}>알고ㅤ</BrandName>
      <BrandName style={{marginBottom: 30}}>ㅤ풀자</BrandName>
      <BrandCatchphrase>막 풀지 말고, 알고 풀자!!!!!</BrandCatchphrase>
    </Container>
  )
}
