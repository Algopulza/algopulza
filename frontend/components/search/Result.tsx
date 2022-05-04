import Header from './result/Header'
import Row from './result/Row'
import styled from 'styled-components'

const Container = styled.section`
  background: #FFC94D;
`

export default function Result() {
  return (
    <Container>
      <Header />
      <Row />
    </Container>
  )
}
