import styled from 'styled-components'

const Title = styled.section`
  margin-bottom: 30px;

  font-size: 1.8vw;
  font-weight: 700;
`

type TitleProps = {
  children: String
}

export default function SubjectTitle({children}: TitleProps) {
  return (
    <Title>{children}</Title>
  )
}
