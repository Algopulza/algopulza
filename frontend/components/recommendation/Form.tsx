import { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import GiftBox from '../random/gift/GiftBox'
import InputTextField from '../common/InputTextField'
import ButtonSubmitting from '../common/button/ButtonSubmitting'
import ImgGiftBoxBlue from '../../public/random/giftbox_blue.png'

const Container = styled.section`
  display: grid;
  grid-template-columns: 6fr 4fr;
  margin-bottom: 80px;
  padding: 0vw 5vw;
  height: 50vh;
  background: #FFC94D;
`

const Boxes = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 3rem;
  padding: 0 2vw;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #F3F3F3;
`

export async function getRecoRandom() {
  const res = await axios.get("https://k6a4081.p.ssafy.io/random-level/dw3624");
  const posts =res.data;
  return{
    props:{
      posts
    }
  }
}

export default function Form() {
  const [dataBlue, setDataBlue] = useState<object>([]);
  const buttonTexts = '수준을 고려해서 추천 받고 싶다면'
  const images = ImgGiftBoxBlue
  const data = dataBlue

  const RecoRandomBlue = async () => {
    await getRecoRandom()
      .then((res) => {
        const data = res.props.posts[0]
        console.log(data)
        setDataBlue(data);
      })
      .catch((err) => console.log(err));
  };
  
  const random = RecoRandomBlue

  useEffect(() => {
    RecoRandomBlue();
  }, []);

  const handleChange = () => {
    // props 맞추기 위한 null 함수
  }

  return (
    <Container>
        <Boxes>
          <GiftBox text={buttonTexts} img={images} data={data} random={random} />
      </Boxes>

      <InputContainer>
        <InputTextField
          textFieldAttr={{id: 'probId', label:'문제 번호', width: '20vw', password: false, autofocus: true}}
          onChange={handleChange}
        />
        <InputTextField
          textFieldAttr={{id: 'memory', label:'메모리', width: '20vw', password: false, autofocus: true}}
          onChange={handleChange}
        />
        <InputTextField
          textFieldAttr={{id: 'runTime', label:'실행시간', width: '20vw', password: false, autofocus: true}}
          onChange={handleChange}
        />
        <InputTextField
          textFieldAttr={{id: 'language', label:'사용 언어', width: '20vw', password: false, autofocus: true}}
          onChange={handleChange}
        />
        <div style={{marginTop: '10px'}}>
          <ButtonSubmitting submittingAttr={{text: '제공', width: '20vw'}} onClick={handleChange} />
        </div>
      </InputContainer>
    </Container>
  )
}
