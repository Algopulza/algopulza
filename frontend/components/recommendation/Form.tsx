import Image from 'next/image'
import GuideImg from '../../public/contents/recommendation_yellow.png'
import FormSolved from './form/FormSolved'
import FormTried from './form/FormTried'
import styled from 'styled-components'

const Container = styled.section`
  display: grid;
  grid-template-columns: 6fr 0.5fr 3fr;
  height: 600px;
  margin-bottom: 80px;
  padding: 0vw 5vw;
  background: #FFC94D;
`

const InputContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const Board = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 27vw;
  height: 500px;
  box-shadow: 0px 2px 10px 5px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  background: #FAFBED;
`

export default function Form() {
  return (
    <Container>
      <Image src={GuideImg} layout="responsive" alt="풀이기록 제공방법 가이드 콘텐츠" />

      <div></div>

      <InputContainer>
        <Board>
          <FormSolved />
          <FormTried />
        </Board>
      </InputContainer>
    </Container>
  )
}
