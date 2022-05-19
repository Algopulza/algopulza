import styled from 'styled-components'
import AnalyCard from '../../../common/card/AnalyCard'
import InputTextField from '../../../common/input/InputTextField'
import Time from './Time'
import ButtonSubmitting from '../../../common/button/ButtonSubmitting'
import { useRecoilState, useRecoilValue } from 'recoil'
import { accessTokenState, checkState, stopwatchLangauge, stopwatchProbIdState } from '../../../../util/stateCollection'
import { checkStopwatch } from '../../../../util/validationCollection'
import { handleStopwatchClick } from '../../../../util/inputHandlerCollection'
import SelectionLanguage from './SelectionLanguage'
import Popup from '../../../common/alert/Popup'
import Check from '../../../common/input/Check'

const Container = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function Stopwatch() {
  const [stopwatchProbId, setStopwatchProbId] = useRecoilState(stopwatchProbIdState)
  const language = useRecoilValue(stopwatchLangauge)
  const accessToken = useRecoilValue(accessTokenState)

  return (
    <AnalyCard>
      <Container>
        <SelectionLanguage />

        <div>
          <InputTextField
            textFieldAttr={{width: '11vw', id: 'problemBojId', label: '문제 번호', marBot: '0px', marRig: '20px', isPw: false, isAf: false}}
            valid={checkStopwatch}
            errorMessage='올바르게 입력해주세요.'
            setter={setStopwatchProbId}
            onKeyDown={() => {}}
          />
          <p id="stopwatchResult" style={{fontSize: '0.9vw', marginTop: 0, marginBottom: 0, color: 'red'}}></p>
        </div>

        <Time />

        <Popup />

        <Check />
      </Container>
    </AnalyCard>
  )
}
