import { useState } from 'react'
import InputTextField from '../../common/input/InputTextField'
import ButtonSubmitting from '../../common/button/ButtonSubmitting'
import styled from 'styled-components'
import InputSelection from '../../common/input/InputSelection'
import { useRecoilValue } from 'recoil'
import { languageSelectionState, accessTokenState } from '../../../util/stateCollection'
import { handleInfoClick } from '../../../util/inputHandlerCollection'

const Container = styled.section`
  display: grid;
  grid-template-rows: 8fr 2fr;
  padding: 20px 0 10px 0;
`

export default function FormInfo() {
  const [problemBojId, setProblemBojId] = useState('')
  const [memory, setMemory] = useState('')
  const [runTime, setRunTime] = useState('')
  const language = useRecoilValue(languageSelectionState)
  const accessToken = useRecoilValue(accessTokenState)

  const handleIdChange = (event: any) => {
    setProblemBojId(event.target.value)
  }
  const handleMemoryChange = (event: any) => {
    setMemory(event.target.value)
  }
  const handleRunTimeChange = (event: any) => {
    setRunTime(event.target.value)
  }

  const info = {
    'problemBojId': problemBojId,
    'memory': memory,
    'runTime': runTime,
    'language': language,
    'codeLength': 0,
    'solvingTime': 0,
    'submitTime': ""
  }

  return (
    <Container>
      <div>
        <InputTextField
          textFieldAttr={{id: 'problemBojId', label:'문제 번호', marginRight: '0px', width: '15vw', password: false, autofocus: true}}
          valid={true}
          validMessage='문제 번호를 정확히 입력해 주세요.'
          onChange={handleIdChange}
          onKeyDown={() => {}}
        />
        <InputTextField
          textFieldAttr={{id: 'memory', label:'메모리', marginRight: '0px', width: '15vw', password: false, autofocus: false}}
          valid={true}
          validMessage='메모리를 정확히 입력해 주세요.'
          onChange={handleMemoryChange}
          onKeyDown={() => {}}
        />
        <InputTextField
          textFieldAttr={{id: 'runTime', label:'실행시간', marginRight: '0px', width: '15vw', password: false, autofocus: false}}
          valid={true}
          validMessage='사용언어를 정확히 입력해 주세요.'
          onChange={handleRunTimeChange}
          onKeyDown={() => {}}
        />
        <InputSelection></InputSelection>
      </div>
      <ButtonSubmitting submittingAttr={{text: '제공', width: '15vw', fontSize: '1.1vw'}} onClick={() => {handleInfoClick(event, info, accessToken)}} />
    </Container>
  )
}
