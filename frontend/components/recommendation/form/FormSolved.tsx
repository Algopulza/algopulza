import InputTextArea from '../../common/input/InputTextArea'
import ButtonSubmitting from '../../common/button/ButtonSubmitting'
import styled from 'styled-components'
import { useRecoilState, useRecoilValue } from 'recoil'
import { accessTokenState, bojIdState, solvedState } from '../../../util/stateCollection'
import { checkSpace } from '../../../util/validationCollection'
import { axiosSolved } from '../../../util/axiosCollection'
import { showToast } from '../../common/alert/Alert'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function FormSolved() {
  const [solved, setSolved] = useRecoilState(solvedState)
  const bojId = useRecoilValue(bojIdState)
  const accessToken = useRecoilValue(accessTokenState)

  const handleClick = (event: any) => {
    axiosSolved(bojId, solved, accessToken)
      .then(res => {
        showToast('제출해주셔서 감사합니다.')
      })
  }

  return (
    <Container>
      <InputTextArea
        textFieldAttr={{width: '20vw', id: 'solved', label: '해결한 문제', marBot: '10px', marRig: '0px', isPw: false, isAf: false}}
        valid={checkSpace}
        errorMessage='해결한 문제들을 입력해주세요.'
        setter={setSolved}
        onKeyDown={() => {}}
      />

      <ButtonSubmitting
        submittingAttr={{text: '해결한 문제 제공', width: '10vw', height: '2.5vw', marBot: '0px', fontSize: '0.9vw'}}
        isImportant={false}
        onClick={handleClick}
      />
    </Container>
  )
}
