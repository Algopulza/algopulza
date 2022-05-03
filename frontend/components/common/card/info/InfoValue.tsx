import styled from 'styled-components'

const Container = styled.section`
  text-align: center;
  font-size: 1.2vw;
  font-weight: 700;
`

type TitleProps = {
  title: string,
}

export default function InfoValue({ title }: TitleProps) {
  return (
    <Container>{title}</Container>
  )
}
