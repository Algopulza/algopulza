import Title from 'components/Category/Title'
import CategoryTable from 'components/Category/CategoryTable'
import styled from "styled-components"

const Container = styled.section`
  padding: 3vw 5vw;
  background: #00bcd4;
`

const Category = () => {
  return (
    <Container>
      <Title />
      <CategoryTable />
    </Container>
  )
}

export default Category
