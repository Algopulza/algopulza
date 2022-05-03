import { useRouter } from 'next/router'
import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  justify-content: center;
`

const Button = styled.button`
  margin-bottom: 25px;

  width: 10vw;
  height: 55px;
  background: #FFC94D;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 2px 10px 5px rgba(0, 0, 0, 0.25);

  font-size: 1.5vw;
  font-weight: 700;
  color: white;
  
  cursor: pointer;
  &:hover {
    background-color: #616161;
  }
`

export default function ButtonLogin() {
  const router = useRouter()

  function moveToRecommendation() {
    router.push('/recommendation')
  }

  return (
    <Container>
      <Button onClick={moveToRecommendation}>로그인</Button>
    </Container>
  )
}
