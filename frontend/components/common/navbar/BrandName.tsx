import Link from 'next/link'
import styled from 'styled-components'

const Title = styled.span`
  padding-left: 40px;
  font-size: 1.8vw;
  font-weight: 700;
`

export default function BrandName() {
  return (
    <Link href="/">
      <a><Title>알고풀자</Title></a>
    </Link>
  )
}
