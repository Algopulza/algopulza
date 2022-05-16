import Image from 'next/image'
import styled from 'styled-components'
import FormSolved from './form/FormSolved'
import FormTried from './form/FormTried'
import FormInfo from './form/FormInfo'
import GuideImg from '../../public/contents/recommendation_yellow.png'

const Container = styled.section`
  display: grid;
  grid-template-columns: 6fr 2fr 2fr;
  height: 650px;
  margin-bottom: 80px;
  padding: 0vw 5vw;
  background: #FFC94D;
`

const Canvas = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const HistoryContainer = styled.div`
  display: grid;
  grid-template-rows: 5fr 5fr;
  justify-content: center;
  background: #FAFBED;
`

const InfoContainer = styled.div`
  display: grid;
  justify-content: center;
  background: #FAFBED;
`

export default function Form() {
  return (
    <Container>
      <Canvas>
        <Image src={GuideImg} layout="responsive" height={980} alt="회원가입 가이드 이미지" />
      </Canvas>

      <HistoryContainer>
        <FormSolved />
        <FormTried />
      </HistoryContainer>

      <InfoContainer>
        <FormInfo />
      </InfoContainer>
    </Container>
  )
}
