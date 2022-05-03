import GiftDescription from './gift/GiftDescription'
import GiftBox from './gift/GiftBox'
import ImgGiftBoxBlue from '../../public/random/giftbox_blue.png'
import ImgGiftBoxRed from '../../public/random/giftbox_red.png'
import _ from 'lodash'
import styled from 'styled-components'

const Container = styled.section`
  margin-bottom: 80px;
  height: 50vh;
  background: #FFC94D;
`

const Boxes = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 0 2vw;
`

export default function Gift() {
  const range = _.range(2)
  const buttonTexts = ['수준을 고려해서 추천 받고 싶다면', '수준에 관계 없이 추천 받고 싶다면']
  const images = [ImgGiftBoxBlue, ImgGiftBoxRed]

  return (
    <Container>
      <GiftDescription />

      <Boxes>
        {range.map(idx => <GiftBox key={idx} text={buttonTexts[idx]} img={images[idx]} />)}
      </Boxes>
    </Container>
  )
}
