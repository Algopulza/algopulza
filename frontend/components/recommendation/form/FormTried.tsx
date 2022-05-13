import { useState } from 'react'
import InputTextField from '../../common/input/InputTextField'
import ButtonSubmitting from '../../common/button/ButtonSubmitting'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { accessTokenState, bojIdState } from '../../../util/stateCollection'
import { axiosTried } from '../../../util/axiosCollection'

const Container = styled.section`
  display: grid;
  grid-template-rows: 6fr 4fr;
  padding: 20px 0 20px 0;
`

export default function FormTried() {
  const [triedProblems, setTriedProblems] = useState('')
  const [valid, setValid] = useState(true)
  const bojId = useRecoilValue(bojIdState)
  const accessToken = useRecoilValue(accessTokenState)

  const handleChange = (event: any) => {
    setTriedProblems(event.target.value)
  }
  const handleClick = () => {
    if (triedProblems.trim() === '') {
      setValid(false)
    } else {
      setValid(true)
      axiosTried(bojId, triedProblems, accessToken)
        .then(res => {
          console.log(res)
          // event.target.value = null
          // setSolvedProblems(event.target.value)
        })
    }
  }

  return (
    <Container>
      <InputTextField
        textFieldAttr={{id: 'tried', label: '시도한 문제', width: '15vw', marginRight: '0px', password: false, autofocus: false}}
        valid={valid}
        validMessage='시도한(tried) 문제 목록을 정확히 입력해주세요.'
        onChange={handleChange}
        onKeyDown={() => {}}
      />
      <ButtonSubmitting submittingAttr={{text: '제공', width: '15vw', fontSize: '1.1vw'}} onClick={handleClick} />
    </Container>
  )
}
