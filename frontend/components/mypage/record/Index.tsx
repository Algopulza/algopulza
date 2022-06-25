import styled from "styled-components"
import Favorite from "./Favorite"
import Solved from "./Solved"

const Container = styled.div`
  display: grid;
  grid-template-columns: 4fr 8.3fr;
  gap: 2em;
`

const Index = () => {
  return (
    <Container>
      <Favorite />
      <Solved />
    </Container>
  )
}

export default Index