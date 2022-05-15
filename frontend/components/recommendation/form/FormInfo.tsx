import InputTextField from '../../common/input/InputTextField'
import ButtonSubmitting from '../../common/button/ButtonSubmitting'
import styled from 'styled-components'
import { handleInfoClick } from '../../../util/inputHandlerCollection'
import InputSelection from '../../common/input/InputSelection'
import { useRecoilState, useRecoilValue } from 'recoil'
import { problemIdState, memoryState, runtimeState, languageState, accessTokenState } from '../../../util/stateCollection'
import { checkSpace } from '../../../util/validationCollection'

const Container = styled.section`
  display: grid;
  grid-template-rows: 8fr 2fr;
  padding: 20px 0 10px 0;
`

export default function FormInfo() {
  const [problemId, setProblemId] = useRecoilState(problemIdState)
  const [memory, setMemory] = useRecoilState(memoryState)
  const [runtime, setRuntime] = useRecoilState(runtimeState)
  const language = useRecoilValue(languageState)
  const accessToken = useRecoilValue(accessTokenState)

  const info = {
    'problemBojId': problemId,
    'memory': memory,
    'runTime': runtime,
    'language': language,
    'codeLength': 0,
    'solvingTime': 0,
    'submitTime': ""
  }

  return (
    <Container>
      <div>
       <InputTextField
          textFieldAttr={{width: '15vw', id: 'problemId', label: 'Problem Id', marBot: '10px', marRig: '0px', isPw: false, isAf: false}}
          valid={checkSpace}
          errorMessage='문제 번호를 입력해주세요.'
          setter={setProblemId}
          onKeyDown={() => {}}
        />
        <InputTextField
          textFieldAttr={{width: '15vw', id: 'memory', label: 'Memory', marBot: '10px', marRig: '0px', isPw: false, isAf: false}}
          valid={checkSpace}
          errorMessage='메모리를 입력해주세요.'
          setter={setMemory}
          onKeyDown={() => {}}
        />
        <InputTextField
          textFieldAttr={{width: '15vw', id: 'runtime', label: 'Runtime', marBot: '10px', marRig: '0px', isPw: false, isAf: false}}
          valid={checkSpace}
          errorMessage='실행 시간을 입력해주세요.'
          setter={setRuntime}
          onKeyDown={() => {}}
        />
        <InputSelection></InputSelection>
        <p id="resultInfo" style={{fontSize: '1vw', marginTop: '10px', marginBottom: 0}}></p>
      </div>
      <ButtonSubmitting
        submittingAttr={{text: '제공', width: '15vw', marBot: '15px', fontSize: '1.1vw'}}
        isImportant={true}
        onClick={() => {handleInfoClick(event, info, accessToken)}}
      />
    </Container>
  )
}
