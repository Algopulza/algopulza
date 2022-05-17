import Image from 'next/image'
import GuideImg from '../../public/contents/signup.png'
import FormSolved from './form/FormSolved'
import FormTried from './form/FormTried'
import styled from 'styled-components'

const Container = styled.section`
  display: grid;
  grid-template-columns: 3fr 1fr 3fr;
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

const GuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.p`
  margin: 10px 0 0 0;
  padding: 0;
`

export default function Form() {
  return (
    <Container>
      <GuideContainer>
        <Image src={GuideImg} layout="responsive" alt="풀이기록 제공방법 가이드 콘텐츠" />
        <Title>
          1. 맞은 문제는 <span style={{color: 'black', fontWeight: '700'}}>해결한 문제</span>에 붙여넣기 해주세요.
        </Title>
        <Title>
          2. 시도했지만 맞지 못한 문제는 <span style={{color: 'black', fontWeight: '700'}}>시도한 문제</span>에 붙여넣기 해주세요.
        </Title>
      </GuideContainer>

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
