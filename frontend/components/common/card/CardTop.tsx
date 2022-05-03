import TopHeader from './TopHeader'
import TopBody from './TopBody'
import styled from 'styled-components'

const Container = styled.section`
  height: 120px;
  background: #EDA016;
  border-radius: 15px 15px 0 0;
`

export default function CardTop() {
  return (
    <Container>
      <TopHeader />
      <TopBody />
    </Container>
  )
}
