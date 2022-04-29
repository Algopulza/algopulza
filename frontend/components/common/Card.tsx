import CardTop from './card/CardTop'
import CardBottom from './card/CardBottom' 
import styled from 'styled-components'

const Container = styled.section`
  width: 15vw;
  height: 200px;
  background: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
`

export default function Card() {
  return (
    <Container>
      <CardTop />
      <CardBottom />
    </Container>
  )
}
