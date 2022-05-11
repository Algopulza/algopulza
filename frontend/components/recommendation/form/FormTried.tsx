import { useState } from 'react'
import InputTextField from '../../common/InputTextField'
import ButtonSubmitting from '../../common/button/ButtonSubmitting'
import styled from 'styled-components'
import { axiosSolved } from '../../../util/axiosCollection'
import { useRecoilValue } from 'recoil'
import { bojIdState } from '../../../util/stateCollection'

const Container = styled.section`
  display: grid;
  grid-template-rows: 6fr 4fr;
  padding: 20px 0 20px 0;
`

export default function FormTried() {
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
      <InputTextField
        textFieldAttr={{id: 'tried', label: '시도한 문제', width: '15vw', password: false, autofocus: false}}
        valid={valid}
        validMessage='시도한(tried) 문제 목록을 정확히 입력해주세요.'
        onChange={handleChange}
        onKeyDown={handleChange}
      />
      <ButtonSubmitting submittingAttr={{text: '제공', width: '15vw'}} onClick={handleChange} />
    </Container>
  )
}
