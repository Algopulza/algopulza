import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
  padding: 1vw 1vw 0vw 1vw;

  font-size: 1vw;
  color: white;
`

const Tags = styled.div`
    display: flex;
    align-items: center;
`

export default function TopHeader() {
  return (
    <Container>
      <Tags>
        <span>#구현ㅤ</span>
        <span>#시뮬레이션ㅤ</span>
      </Tags>
      <span>14503</span>
    </Container>
  )
}
