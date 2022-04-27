import Link from 'next/link'
import styled from 'styled-components'

const Container = styled.section`
  padding: 0vw 5vw;
`

const Title = styled.div`
  margin: 0;
`

function Analysis() {
  return (
    <Container>
      <Title>This is an Analysis Page.</Title>

      <Link href="/">
        <a>뒤로 가기(랜딩페이지)</a>
      </Link>
    </Container>
  )
}

export default Analysis
