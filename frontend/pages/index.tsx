import Link from 'next/link'
import styled from 'styled-components'

const Container = styled.section`
  padding: 0vw 5vw;
`

const Title = styled.div`
  margin: 0;
`

function Landing() {
  return (
    <Container>
      <Title>This is a Landing Page.</Title>

      <Link href="/recommendation">
        <a>로그인(recommendation)</a>
      </Link>

      {' '}
      <Link href="/random">
        <a>로그인(random)</a>
      </Link>

      {' '}
      <Link href="/list">
        <a>로그인(list)</a>
      </Link>

      {' '}
      <Link href="/analysis">
        <a>로그인(analysis)</a>
      </Link>
    </Container>
  )
}

export default Landing
