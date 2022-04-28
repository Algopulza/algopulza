import styled from 'styled-components'

const Text = styled.div`
  font-size: 1.3vw;
  color: #999999;
`

export default function ExtensionLink() {
  return (
    <Text>
      익스텐션 <a href="/recommend">설치</a>하기
    </Text>
  )
}
