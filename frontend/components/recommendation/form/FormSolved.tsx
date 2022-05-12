import { useState } from 'react'
import InputTextField from '../../common/input/InputTextField'
import ButtonSubmitting from '../../common/button/ButtonSubmitting'
import { useRecoilValue } from 'recoil'
import { accessTokenState, bojIdState } from '../../../util/stateCollection'
import { axiosSolved } from '../../../util/axiosCollection'
import styled from 'styled-components'

const Container = styled.section`
  display: grid;
  grid-template-rows: 6fr 4fr;
  padding: 20px 0 20px 0;
`

export default function FormSolved() {
  const [solvedProblems, setSolvedProblems] = useState('')
  const [valid, setValid] = useState(true)
  const bojId = useRecoilValue(bojIdState)
  const accessToken = useRecoilValue(accessTokenState)

  const handleChange = (event: any) => {
    setSolvedProblems(event.target.value)
  }
  const handleClick = (event: any) => {
    if (solvedProblems.trim() === '') {
      setValid(false)
    } else {
      setValid(true)
      axiosSolved(bojId, solvedProblems, accessToken)
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
        textFieldAttr={{id: 'solved', label: '해결한 문제', width: '15vw', password: false, autofocus: false}}
        valid={valid}
        validMessage='해결한(solved) 문제 목록을 정확히 입력해주세요.'
        onChange={handleChange}
        onKeyDown={() => {}}
      />
      <ButtonSubmitting submittingAttr={{text: '제공', width: '15vw'}} onClick={handleClick} />
    </Container>
  )
}
