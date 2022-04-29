import GiftDescription from './gift/GiftDescription'
import GiftBox from './gift/GiftBox'
import GiftBoxImage001 from '../../public/images/giftbox_blue.png'
import GiftBoxImage002 from '../../public/images/giftbox_red.png'
import _ from 'lodash'
import styled from 'styled-components'

const Container = styled.section`
  margin-bottom: 80px;
  height: 53vh;
  background: #FFC94D;
`

const Boxes = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0 10vw;
`

export default function Gift() {
  const range = _.range(2)
  const texts = ['수준을 고려해서 추천 받고 싶다면', '수준에 관계 없이 추천 받고 싶다면']
  const images = [GiftBoxImage001, GiftBoxImage002]

  return (
    <Container>
      <GiftDescription />

      <Boxes>
        {range.map(idx => <GiftBox key={idx} text={texts[idx]} img={images[idx]} />)}
      </Boxes>
    </Container>
  )
}
