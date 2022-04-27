import Link from 'next/link'
import { ReactElement } from 'react'
import Layout from '../../components/common/Layout'
import Subject from '../../components/recommendation/Subject'
import styled from 'styled-components'

const Container = styled.section`
  padding: 0vw 5vw;
`

const Title = styled.div`
  margin: 0;
`

export default function Recommendation() {
  return (
    <Container>
      <Title>This is a Recommendation Page.</Title>

      <Subject />
      <Subject />
      <Subject />
      <Subject />
      <Subject />

      <Link href="/">
        <a>뒤로 가기(랜딩페이지)</a>
      </Link>
    </Container>
  )
}

Recommendation.getLayout = function getLayout(recommendation: ReactElement) {
  return (
    <Layout>{recommendation}</Layout>
  )
}
