import InputTextArea from '../../common/input/InputTextArea'
import ButtonSubmitting from '../../common/button/ButtonSubmitting'
import styled from 'styled-components'
import { axiosSolved } from '../../../util/axiosCollection'
import { useRecoilState, useRecoilValue } from 'recoil'
import { accessTokenState, bojIdState, solvedState } from '../../../util/stateCollection'
import { checkSpace } from '../../../util/validationCollection'
import { sendMessage } from '../../../util/inputHandlerCollection'

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
        sendMessage('resultSolved', '감사합니다!')
      })
  }

  return (
    <Container>
      <div>
        <InputTextArea
          textFieldAttr={{width: '25vw', id: 'solved', label: '해결한 문제', marBot: '20px', marRig: '0px', isPw: false, isAf: true}}
          valid={checkSpace}
          errorMessage='해결한 문제들을 입력해주세요.'
          setter={setSolved}
          onKeyDown={() => {}}
        />
        <p id="resultSolved" style={{fontSize: '0.8vw', marginTop: 0, marginBottom: 0}}></p>
      </div>
      <ButtonSubmitting
        submittingAttr={{text: '해결한 문제 제공', width: '12.5vw', height: '2.5vw', marBot: '80px', fontSize: '1vw'}}
        isImportant={true}
        onClick={handleClick}
      />
    </Container>
  )
}
