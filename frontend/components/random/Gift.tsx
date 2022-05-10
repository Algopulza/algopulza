import { useState, useEffect } from "react";
import styled from 'styled-components'
import GiftDescription from './gift/GiftDescription'
import GiftBox from './gift/GiftBox'
import ImgGiftBoxBlue from '../../public/random/giftbox_blue.png'
import ImgGiftBoxRed from '../../public/random/giftbox_red.png'
import _ from 'lodash'
import axios from "axios";
// import { getRandom } from "../../api/random";

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

export async function getRandom() {
  const res = await axios.get("https://k6a408.p.ssafy.io/api/v1/problems/random-one");
  console.log(res)
  const posts =res.data.data;
  return{
    props:{
      posts
    }
  }
}

  function Gift() {
  const [dataRed, setDataRed] = useState<object>([]);
  const [dataBlue, setDataBlue] = useState<object>([]);
  const range = _.range(2)
  const buttonTexts = ['수준을 고려해서 추천 받고 싶다면', '수준에 관계 없이 추천 받고 싶다면']
  const images = [ImgGiftBoxBlue, ImgGiftBoxRed]
  const data = [dataBlue, dataRed]

  const RandomBlue = async () => {
    await getRandom()
      .then((res) => {
        const data = res.props.posts
        console.log(data)
        setDataBlue(data);
      })
      .catch((err) => console.log(err));
  };

  const RandomRed = async () => {
    await getRandom()
      .then((res) => {
        const data = res.props.posts
        console.log(data)
        setDataRed(data);
      })
      .catch((err) => console.log(err));
  };

  
  const random = [RandomBlue, RandomRed]

  useEffect(() => {
    RandomBlue();
    RandomRed();
  }, []);

  return (
    <Container>
      <GiftDescription />

      <Boxes>
        {range.map(idx => <GiftBox key={idx} text={buttonTexts[idx]} img={images[idx]} data={data[idx]} random={random[idx]} />)}
      </Boxes>
    </Container>
  )
}

export default Gift;