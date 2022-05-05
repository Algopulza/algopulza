import { ReactElement } from 'react'
import Layout from '../../components/common/Layout'
import styled from 'styled-components'

const Container = styled.section`
  padding: 0vw 5vw;
`

export default function Signup() {
  return (
    <Container>
      hi
    </Container>
  )
}

Signup.getLayout = function getLayout(signup: ReactElement) {
  return (
    <Layout>{signup}</Layout>
  )
}
