import styled from 'styled-components'

const Button = styled.button`
  display: block;
  width: 13vw;
  height: 70px;
  background: #FFC94D;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  font-size: 1.6vw;
  font-weight: 700;
  color: white;
  
  cursor: pointer;
  &:hover {
    background-color: #dca03a;
  }
`

export default function LoginButton() {
  return (
    <Button>로그인</Button>
  )
}
