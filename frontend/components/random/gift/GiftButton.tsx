import styled from 'styled-components'

const Button = styled.button`
  width: 20vw;
  height: 40px;
  background: #FFFFFF;
  border: none;
  border-radius: 10px;
  font-size: 1.1vw;
  color: black;
  cursor: pointer;
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
