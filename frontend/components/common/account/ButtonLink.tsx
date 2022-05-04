import styled from 'styled-components'

const Text = styled.div`
  text-align: center;
  font-size: 1.3vw;
  color: #616161;
`

const Words = styled.span`
  color: #FFC94D;
  cursor: pointer;
`

export default function ButtonLink() {
  const handleClick = () => {
    window.open("https://chrome.google.com/webstore/category/extensions?hl=ko")
  }

  return (
    <Text>
      익스텐션을 <Words onClick={handleClick}>설치</Words>해 보세요
    </Text>
  )
}
