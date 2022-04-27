import Link from 'next/link'
import Recommendation from '../../components/recommendation/Subject'
import styled from 'styled-components'

const Container = styled.section`
  padding: 0vw 5vw;
`

const Title = styled.div`
  margin: 0;
`

function Home() {
  return (
    <Container>
      <Title>This is a Recommendation Page.</Title>

      <Recommendation />
      <Recommendation />
      <Recommendation />
      <Recommendation />
      <Recommendation />

      <Link href="/">
        <a>뒤로 가기(랜딩페이지)</a>
      </Link>
    </Container>
  )
}

export default Home
