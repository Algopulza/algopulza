import Link from 'next/link'
import { ReactElement } from 'react'
import Layout from '../../components/common/Layout'
import styled from 'styled-components'

const Container = styled.section`
  padding: 0vw 5vw;
`

const Title = styled.div`
  margin: 0;
`

export default function List() {
  return (
    <Container>
      <Title>This is a List Page.</Title>

      <Link href="/">
        <a>뒤로 가기(랜딩페이지)</a>
      </Link>
    </Container>
  )
}

List.getLayout = function getLayout(list: ReactElement) {
  return (
    <Layout>{list}</Layout>
  )
}
