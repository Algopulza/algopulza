import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const BrandName = styled.p`
  margin: 0;
  line-height: 1.2;
  text-align: center;
  font-size: 5vw;
  font-weight: 700;
`
const BrandCatchphrase = styled.p`
  margin: 0;
  line-height: 1.7;
  text-align: center;
  font-size: 1.7vw;
  color: #545454;
  margin-bottom: 50px;
`

export default function Content() {
  return (
    <Container>
      <BrandName>알고ㅤ</BrandName>
      <BrandName>ㅤ풀자</BrandName>
      <BrandCatchphrase>막 풀지 말고, 알고 풀자!</BrandCatchphrase>
    </Container>
  )
}
