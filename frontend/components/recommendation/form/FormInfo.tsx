import { useState } from 'react'
import InputTextField from '../../common/InputTextField'
import ButtonSubmitting from '../../common/button/ButtonSubmitting'
import styled from 'styled-components'

const Container = styled.section`
  display: grid;
  grid-template-rows: 8fr 2fr;
  padding: 20px 0 10px 0;
`

export default function FormInfo() {
  const [bojId, setBojId] = useState('')
  const [valid, setValid] = useState(true)
  const handleChange = (event: any) => {
    setBojId(event.target.value)
  }
  const handleClick = () => {
    if (bojId.trim() === '') {
      setValid(false)
    } else {
      setValid(true)
    }
  }

  return (
    <Container>
      <div>
        <InputTextField
          textFieldAttr={{id: 'probId', label:'문제 번호', width: '15vw', password: false, autofocus: true}}
          valid={valid}
          validMessage='백준 아이디를 정확히 입력해 주세요.'
          onChange={handleChange}
          onKeyDown={handleChange}
        />
        <InputTextField
          textFieldAttr={{id: 'memory', label:'메모리', width: '15vw', password: false, autofocus: false}}
          valid={valid}
          validMessage='백준 아이디를 정확히 입력해 주세요.'
          onChange={handleChange}
          onKeyDown={handleChange}
        />
        <InputTextField
          textFieldAttr={{id: 'runTime', label:'실행시간', width: '15vw', password: false, autofocus: false}}
          valid={valid}
          validMessage='백준 아이디를 정확히 입력해 주세요.'
          onChange={handleChange}
          onKeyDown={handleChange}
        />
        <InputTextField
          textFieldAttr={{id: 'language', label:'사용 언어', width: '15vw', password: false, autofocus: false}}
          valid={valid}
          validMessage='백준 아이디를 정확히 입력해 주세요.'
          onChange={handleChange}
          onKeyDown={handleChange}
        />
      </div>
      <ButtonSubmitting submittingAttr={{text: '제공', width: '15vw'}} onClick={handleChange} />
    </Container>
  )
}
