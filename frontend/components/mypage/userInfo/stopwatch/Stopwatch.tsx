import styled from 'styled-components'
import AnalyCard from '../../../common/card/AnalyCard'
import InputTextField from '../../../common/input/InputTextField'
import Time from './Time'
import ButtonSubmitting from '../../../common/button/ButtonSubmitting'
import { useRecoilState } from 'recoil'
import { stopwatchProbIdState } from '../../../../util/stateCollection'
import { nothing } from '../../../../util/validationCollection'

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function Stopwatch() {
  const [stopwatchProbId, setStopwatchProbId] = useRecoilState(stopwatchProbIdState)

  return (
    <AnalyCard>
      <Container>
        <InputTextField
          textFieldAttr={{width: '10vw', id: 'problemBojId', label: '문제 번호', marBot: '0px', marRig: '30px', isPw: false, isAf: false}}
          valid={nothing}
          errorMessage='해결한 문제들을 공백 없이 입력해주세요.'
          setter={setStopwatchProbId}
          onKeyDown={() => {}}
        />

        <Time />

        <ButtonSubmitting
          submittingAttr={{text: '제출', width: '3.5vw', height: '2.2vw', marBot: '0px', fontSize: '1.1vw'}}
          isImportant={true}
          onClick={() => {}}
        />
      </Container>
    </AnalyCard>
  )
}
