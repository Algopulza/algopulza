import { useRouter } from 'next/router'
import styled from 'styled-components'

const Button = styled.button`
  display: block;
  margin-bottom: 20px;

  width: 13vw;
  height: 70px;
  background: #FFC94D;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  font-size: 1.5vw;
  font-weight: 700;
  color: white;
  
  cursor: pointer;
  &:hover {
    background-color: #DCA03A;
  }
`

export default function LoginButton() {
  const router = useRouter()
  function moveToRecommendation() {
    router.push('/recommendation')
  }

  return (
    <Button onClick={moveToRecommendation}>로그인</Button>
  )
}
