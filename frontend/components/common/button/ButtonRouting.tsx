import { useRouter } from 'next/router'
import styled from 'styled-components'

const Container = styled.section`
  margin-right: 1vw;
  color: #545454;
  &:hover {
    color: #FFC94D;
  }
`

export default function ButtonRouting() {
  const router = useRouter()
  function moveToRecommendation() {
    router.push('/recommendation')
  }

  return (
    <Container onClick={moveToRecommendation}>비회원 로그인</Container>
  )
}
