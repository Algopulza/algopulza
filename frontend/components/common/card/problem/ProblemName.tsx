import styled from 'styled-components'

const Title = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 110px;

  font-size: 1.8vw;
  color: white;
`

export default function ProblemName() {
  return (
    <Title>로봇 청소기</Title>
  )
}
