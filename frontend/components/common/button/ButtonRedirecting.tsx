import styled from 'styled-components'

const Container = styled.span`
  margin-right: 1vw;
  color: #8F8B82;
  cursor: pointer;
  &:hover {
    color: #FFC94D;
  }
`

export default function ButtonRedirecting() {
  function clickHandler () {
    const url = 'https://chrome.google.com/webstore/category/extensions?hl=ko'
    window.open(url)
  }
  return (
    <Container onClick={clickHandler}>알고풀자 익스텐션을 설치해보세요</Container>
  )
}
