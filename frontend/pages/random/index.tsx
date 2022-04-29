import { ReactElement } from 'react'
import Layout from '../../components/common/Layout'
import Gift from '../../components/random/Gift'
import Subject from '../../components/random/Subject'
import styled from 'styled-components'

const Container = styled.section`
  padding: 0vw 5vw;
`

export default function Random() {
  return (
    <>
      <Gift />
      
      <Container>
        <Subject />
      </Container>
    </>
  )
}

Random.getLayout = function getLayout(random: ReactElement) {
  return (
    <Layout>{random}</Layout>
  )
}
