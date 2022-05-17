import { useState, useEffect } from "react"
import styled from 'styled-components'
import GiftDescription from './gift/GiftDescription'
import GiftBox from './gift/GiftBox'
import ImgGiftBoxBlue from '../../public/random/giftbox_blue.png'
import ImgGiftBoxRed from '../../public/random/giftbox_red.png'
import _ from 'lodash'
import { getRandomOne } from "../../api/back/ramdom/RandomOne"
import { getRandBox } from "../../api/flask/random/RandBox"
import { useRecoilValue } from "recoil";
import { bojIdState, accessTokenState } from "../../util/stateCollection"

const Container = styled.section`
  margin-bottom: 80px;
  height: 50vh;
  background: #282828;
`

const Boxes = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 0 2vw;
`

function Gift() {
  const [dataRed, setDataRed] = useState<object>([]);
  const [dataBlue, setDataBlue] = useState<object>([]);
  const range = _.range(2)
  const buttonTexts = ['수준을 고려해서 추천 받고 싶다면', '수준에 관계 없이 추천 받고 싶다면']
  const images = [ImgGiftBoxBlue, ImgGiftBoxRed]
  const data = [dataBlue, dataRed]
  const accessToken = useRecoilValue(accessTokenState)
  const bojId = useRecoilValue(bojIdState)

  const RandomBlue = async () => {
    await getRandBox(accessToken, bojId)
      .then((res) => {
        const data = res.data[0]
        setDataBlue(data)
      })
  }

  const RandomRed = async () => {
    await getRandomOne(accessToken)
      .then((res) => {
        const data = res.data.data
        setDataRed(data)
      })
  }
  
  const random = [RandomBlue, RandomRed]

  useEffect(() => {
    RandomBlue()
    RandomRed()
  }, [])

  return (
    <Container>
      <GiftDescription />

      <Boxes>
        {range.map(idx => <GiftBox key={idx} text={buttonTexts[idx]} img={images[idx]} data={data[idx]} random={random[idx]} />)}
      </Boxes>
    </Container>
  )
}

export default Gift