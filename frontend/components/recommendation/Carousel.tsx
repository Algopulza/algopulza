import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 80px;
  height: 50vh;
  background: #FFC94D;
`

export default function Carousel() {
  const settings = {
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    speed: 1000
  }

  return (
    <Container>
      수정 중..
    </Container>
  )
}
