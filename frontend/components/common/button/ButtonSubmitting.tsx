import { useRouter } from 'next/router'
import styled from 'styled-components'

const Button = styled.button`
  width: 10vw;
  height: 55px;
  background: #FFC94D;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 4px 10px 6px rgba(0, 0, 0, 0.25);

  font-size: 1.5vw;
  font-weight: 700;
  color: white;
  
  cursor: pointer;
  &:hover {
    background-color: #1A4568;
  }
`
export default function ButtonSubmitting() {
  const router = useRouter()
  function moveToRecommendation() {
    router.push('/recommendation')
  }

  return (
    <Button onClick={moveToRecommendation}>로그인</Button>
  )
}
