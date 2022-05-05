import { ReactElement } from 'react'
import Condition from '../../components/search/Condition'
import Result from '../../components/search/Result'
import SearchPagination from '../../components/search/SearchPagination'
import Layout from '../../components/common/Layout'
import styled from 'styled-components'

const Container = styled.section`
  padding: 2vh 5vw 0 5vw;
`

const Subcontainer = styled.div`
  display: flex;
  justify-content: center;
`

export default function Search() {
  return (
    <Container>
      <Condition />
      <Result />
      <Subcontainer>
        <SearchPagination />
      </Subcontainer>
    </Container>
  )
}

Search.getLayout = function getLayout(search: ReactElement) {
  return (
    <Layout>{search}</Layout>
  )
}
