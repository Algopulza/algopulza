import { ReactElement } from 'react'
import Problems from '../../components/list/Problems'
import Layout from '../../components/common/Layout'
import styled from 'styled-components'

const Container = styled.section`
  padding: 0vw 5vw;
`

export default function List() {
  return (
    <Container>
      <Problems />
    </Container>
  )
}

List.getLayout = function getLayout(list: ReactElement) {
  return (
    <Layout>{list}</Layout>
  )
}
