import { ReactElement } from 'react'
import Condition from '../../components/search/Condition'
import Result from '../../components/search/Result'
import Pagination from '../../components/search/Pagination'
import Layout from '../../components/common/Layout'
import styled from 'styled-components'

const Container = styled.section`
  padding: 0vw 5vw;
`

export default function Search() {
  return (
    <Container>
      <Condition />
      <Result />
      <Pagination />
    </Container>
  )
}

Search.getLayout = function getLayout(search: ReactElement) {
  return (
    <Layout>{search}</Layout>
  )
}
