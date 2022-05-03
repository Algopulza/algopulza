import styled from 'styled-components'

const Container = styled.section`
  text-align: center;
  font-size: 1.1vw;
  font-weight: 700;
`

type ItemProps = {
  item: string,
}

export default function InfoKey({ item }: ItemProps) {
  return (
    <Container>{item}</Container>
  )
}
