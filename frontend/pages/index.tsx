import Image from 'next/image'
import BrandLogo from '../public/common/brand_logo.png'
import Carousel from '../components/landing/Carousel'
import Content from '../components/landing/Content'
import Form from '../components/landing/Form'
import styled from 'styled-components'

const Container = styled.section`
  display: grid;
  grid-template-columns: 60vw 40vw;
  height: 100vh;
`

const Subcontainer = styled.div`
  display: grid;
  grid-template-rows: 5vh 10vh 35vh 50vh;
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

export default function Landing() {
  return (
    <Container>
      <Carousel />

      <Subcontainer>
        <div></div>
        <Row>
          <div></div>
          <Cell>
            <Image src={BrandLogo} layout="fixed" width={100} height={100} alt="brand logo image" />
          </Cell>
          <div></div>
        </Row>
        <Content />
        <Form />
      </Subcontainer>
    </Container>
  )
}
