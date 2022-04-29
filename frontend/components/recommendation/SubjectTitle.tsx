import styled from 'styled-components'

const Container = styled.section`
  margin-bottom: 20px;

  font-size: 1.8vw;
  font-weight: 700;
`

type TitleProps = {
  children: String
}

export default function SubjectTitle({children}: TitleProps) {
  return (
    <Container>{children}</Container>
  )
}
