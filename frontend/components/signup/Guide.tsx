import styled from 'styled-components'

const Text = styled.section`
  margin: 0;
  padding: 5vw;
  height: 100vh;
  background: #FFC94D;
  font-size: 1.2vw;
`

export default function Guide() {
  return (
    <Text>
      알고풀자를 방문해주셔서 감사합니다.<br />
      <br />
      1. 인증을 위해 백준 사이트의 정보 수정 페이지에서 아이디를 캡처하여 넣어주세요.<br />
      2. 반환된 아이디가 정확하다면 회원가입 절차를 이어서 진행해주세요.<br />
    </Text>
  )
}
