import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`

const BrandName = styled.p`
  margin: 0;
  line-height: 1.2;
  font-size: 2.5vw;
  font-weight: 700;
`

export default function Content() {
  return (
    <Container>
      <BrandName>알고풀자</BrandName>
    </Container>
  )
}
