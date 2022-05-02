import styled from "styled-components"
import SearchInput from "components/Search/SearchInput";

const Container = styled.section`
  margin-bottom: 50px;

  text-align: center;
  font-size: 2vw;
`

const Title = () => {
  return (
    <Container>
      전체 문제 목록
      <SearchInput/>
    </Container>
  )
}

export default Title
