import styled from 'styled-components'
import AnalyCard from '../../../common/card/AnalyCard'
import InputTextField from '../../../common/input/InputTextField'
import Time from './Time'
import ButtonSubmitting from '../../../common/button/ButtonSubmitting'
import { useRecoilState, useRecoilValue } from 'recoil'
import { accessTokenState, stopwatchMinState, stopwatchProbIdState } from '../../../../util/stateCollection'
import { checkStopwatch } from '../../../../util/validationCollection'
import { handleStopwatchClick } from '../../../../util/inputHandlerCollection'

const Container = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function Stopwatch() {
  const [stopwatchProbId, setStopwatchProbId] = useRecoilState(stopwatchProbIdState)
  const solvingMin = useRecoilValue(stopwatchMinState)
  const accessToken = useRecoilValue(accessTokenState)

  return (
    <AnalyCard>
      <Container>
        <div>
          <InputTextField
            textFieldAttr={{width: '19vw', id: 'problemBojId', label: '문제 번호', marBot: '0px', marRig: '30px', isPw: false, isAf: false}}
            valid={checkStopwatch}
            errorMessage='문제 번호(1000 이상의 수)를 입력해주세요.'
            setter={setStopwatchProbId}
            onKeyDown={() => {}}
          />
          <p id="stopwatchResult" style={{fontSize: '0.9vw', marginTop: 0, marginBottom: 0, color: 'red'}}></p>
        </div>

        <Time />

        <ButtonSubmitting
          submittingAttr={{text: '제출', width: '3.5vw', height: '2.2vw', marBot: '0px', fontSize: '1.1vw'}}
          isImportant={true}
          onClick={() => {handleStopwatchClick(event, stopwatchProbId, solvingMin, accessToken)}}
        />
      </Container>
    </AnalyCard>
  )
}
