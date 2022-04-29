import GiftDescription from './gift/GiftDescription'
import GiftBox from './gift/GiftBox'
import styled from 'styled-components'

const Container = styled.section`
  margin-bottom: 80px;
  height: 53vh;
  background: #FFC94D;
`

const Boxes = styled.div`
  display: flex;
  justify-content: space-around;
`

export default function Gift() {
  const texts = ['수준을 고려해서 추천 받고 싶다면', '수준에 관계 없이 추천 받고 싶다면']

  return (
    <Container>
      <GiftDescription />

      <Boxes>
        {/* {texts.map(text => <GiftBox key={text} text={text} />)} */}
      </Boxes>
    </Container>
  )
}
