import styled from 'styled-components'

const Word = styled.span`
  margin-right: 1vw;
  color: #8F8B82;
  cursor: pointer;
  &:hover {
    color: #FFC94D;
  }
`

export default function ButtonToggling() {
  return (
    <Word>회원 가입</Word>
  )
}
