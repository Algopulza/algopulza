import styled from 'styled-components'

const Container = styled.section`
  margin-top: 20px;
  text-align: center;
  color: #545454;
  cursor: pointer;
`

export default function ButtonRedirecting() {
  function clickHandler () {
    const url = 'https://chrome.google.com/webstore/category/extensions?hl=ko'
    window.open(url)
  }
  
  return (
    <Container onClick={clickHandler}>
      알고풀자 <span style={{color: '#000000', fontWeight: 700}}>익스텐션</span>을 설치해보세요
    </Container>
  )
}
