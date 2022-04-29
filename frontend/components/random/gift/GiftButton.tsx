import styled from 'styled-components'

const Button = styled.button`

`

type TextProps = {
  children: string,
}

export default function GiftButton({ children }: TextProps) {
  return (
    <Button>{children}</Button>
  )
}
