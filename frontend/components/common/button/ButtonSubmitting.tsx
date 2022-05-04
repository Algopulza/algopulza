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
const CustomButton = styled.button`
  margin-bottom: 25px;

  width: 10vw;
  height: 55px;
  background: #FFC94D;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 4px 10px 6px rgba(0, 0, 0, 0.25);

  font-size: 1.5vw;
  font-weight: 700;
  color: white;
  
  cursor: pointer;
  &:hover {
    background-color: #ffd370;
  }
`
export default function ButtonStranger() {
  return (
    <Link href="/recommendation"><a><Word>비회원 로그인</Word></a></Link>
  )
}
