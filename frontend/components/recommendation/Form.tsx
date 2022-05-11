import { useState } from 'react'
import styled from 'styled-components'
import InputTextField from '../common/InputTextField'
import ButtonSubmitting from '../common/button/ButtonSubmitting'

const Container = styled.section`
  display: grid;
  grid-template-columns: 6fr 4fr;
  margin-bottom: 80px;
  padding: 0vw 5vw;
  height: 50vh;
  background: #FFC94D;
`

export default function Form() {

  const handleChange = () => {
    // props 맞추기 위한 null 함수
  }
  const [valid, setValid] = useState(true)

  return (
    <Container>
      <InputTextField
        textFieldAttr={{id: 'probId', label:'문제 번호', width: '20vw', password: false, autofocus: true}}
        valid={valid}
        validMessage='백준 아이디를 정확히 입력해 주세요.'
        onChange={handleChange}
        onKeyDown={handleChange}
      />
      <InputTextField
        textFieldAttr={{id: 'memory', label:'메모리', width: '20vw', password: false, autofocus: true}}
        valid={valid}
        validMessage='백준 아이디를 정확히 입력해 주세요.'
        onChange={handleChange}
        onKeyDown={handleChange}
      />
      <InputTextField
        textFieldAttr={{id: 'runTime', label:'실행시간', width: '20vw', password: false, autofocus: true}}
        valid={valid}
        validMessage='백준 아이디를 정확히 입력해 주세요.'
        onChange={handleChange}
        onKeyDown={handleChange}
      />
      <InputTextField
        textFieldAttr={{id: 'language', label:'사용 언어', width: '20vw', password: false, autofocus: true}}
        valid={valid}
        validMessage='백준 아이디를 정확히 입력해 주세요.'
        onChange={handleChange}
        onKeyDown={handleChange}
      />
      <div style={{marginTop: '10px'}}>
        <ButtonSubmitting submittingAttr={{text: '제공', width: '20vw'}} onClick={handleChange} />
      </div>
    </Container>
  )
}
