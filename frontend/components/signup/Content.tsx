import Image from 'next/image'
import BrandLogo from '../../public/common/brand_logo.png'
import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`

const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const BrandName = styled.p`
  margin: 20px 0 0 0;
  line-height: 1.2;
  font-size: 2.5vw;
  font-weight: 700;
`

export default function Content() {
  return (
    <Container>
      <Row>
        <div></div>
        <Cell><Image src={BrandLogo} layout="fixed" width={100} height={100} alt="brand logo image" /></Cell>
      </Row>
      <BrandName>알고풀자</BrandName>
    </Container>
  )
}
