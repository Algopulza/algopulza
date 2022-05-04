import Link from 'next/link'
import styled from 'styled-components'

const Word = styled.span`
  margin-right: 1vw;
  color: #8F8B82;
  cursor: pointer;
  &:hover {
    color: #FFC94D;
  }
`

export default function ButtonStranger() {
  return (
    <Link href="/recommendation"><a><Word>비회원 로그인</Word></a></Link>
  )
}
