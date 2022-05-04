import styled from 'styled-components'

const Container = styled.section`
  margin-right: 1vw;
  color: #545454;
  &:hover {
    color: #FFC94D;
  }
`

export default function ButtonToggling() {
  return (
    <Container>회원 가입</Container>
  )
}
