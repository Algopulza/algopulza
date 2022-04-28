import styled from 'styled-components'

const Button = styled.button`
  margin-top: 4rem;
  margin-bottom: 1rem;
  width: 10rem;
  height: 3rem;
  font-size: 1rem;
  font-weight: 600;
  font-family: GmarketSansMedium;
  background-color: #ffc94d;
  color: white;
  border: none;
  border-radius: 10px;
  transition: 0.2s;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  &:hover {
    background-color: #dca03a;
  }
`;

export default function ExtensionButton() {
  return (
    <Button>로그인</Button>
  )
}
