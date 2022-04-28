import Link from 'next/link'
import styled from 'styled-components'

const Title = styled.section`
  padding-left: 40px;
  font-size: 1.7vw;
  font-weight: 700;
  color: #000000;
`

export default function ServiceName() {
  return (
    <Link href="/">
      <a><Title>알고풀자</Title></a>
    </Link>
  )
}
