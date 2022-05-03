import styled from 'styled-components'

const Button = styled.button`
  margin-bottom: 13px;
  width: 21vw;
  height: 40px;
  background: #FFFFFF;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 4px 10px 6px rgba(0, 0, 0, 0.25);

  font-size: 1.2vw;
  color: black;

  cursor: pointer;
  /* &:hover {
    background-color: #ffd370;
  } */
`

type TextProps = {
  onClick(): void
  children: string,
}

export default function GiftButton({ onClick, children }: TextProps) {
  return (
    <Button onClick={onClick}>{children}</Button>
  )
}
