import InputTextField from '../common/InputTextField'
import ButtonSubmitting from '../common/button/ButtonSubmitting'
import styled from 'styled-components'

const Container = styled.section`
  display: grid;
  grid-template-columns: 6fr 4fr;
  margin-bottom: 80px;
  padding: 0vw 5vw;
  height: 50vh;
  background: #FFC94D;
`

const Subcontainer = styled.div`
  display: flex;
  align-items: center;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #F3F3F3;
`

export default function Form() {
  return (
    <Container>
      <Subcontainer>
        문제 풀이 정보를 기록하면 좋은 점에 대한 내용이 들어갈 예정입니다.
      </Subcontainer>

      <InputContainer>
        <InputTextField
          textFieldAttr={{id: 'probId', label:'문제 번호', width: '20vw', password: false, autofocus: true}}
        />
        <InputTextField
          textFieldAttr={{id: 'memory', label:'메모리', width: '20vw', password: false, autofocus: true}}
        />
        <InputTextField
          textFieldAttr={{id: 'runTime', label:'실행시간', width: '20vw', password: false, autofocus: true}}
        />
        <InputTextField
          textFieldAttr={{id: 'language', label:'사용 언어', width: '20vw', password: false, autofocus: true}}
        />
        <div style={{marginTop: '10px'}}>
          <ButtonSubmitting submittingAttr={{text: '제공', width: '20vw'}} />
        </div>
      </InputContainer>
    </Container>
  )
}
