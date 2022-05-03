import Link from 'next/link'
import styled from 'styled-components'

const Text = styled.div`
  text-align: center;
  font-size: 1.3vw;
  color: #999999;
`

export default function ButtonExtension() {
  return (
    <Text>
      익스텐션 <Link href="/recommendation"><a>설치</a></Link>하기
    </Text>
  )
}
