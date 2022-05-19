import InputTextArea from '../../common/input/InputTextArea'
import ButtonSubmitting from '../../common/button/ButtonSubmitting'
import styled from 'styled-components'
import { axiosTried } from '../../../util/axiosCollection'
import { useRecoilState, useRecoilValue } from 'recoil'
import { accessTokenState, bojIdState, triedState } from '../../../util/stateCollection'
import { checkSpace } from '../../../util/validationCollection'
// import { sendMessage } from '../../../util/inputHandlerCollection'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function FormTried() {
  const [tried, setTried] = useRecoilState(triedState)
  const bojId = useRecoilValue(bojIdState)
  const accessToken = useRecoilValue(accessTokenState)

  // const handleClick = (event: any) => {
  //   axiosTried(bojId, tried, accessToken)
  //     .then(res => {
  //       sendMessage('resultTried', '감사합니다!')
  //     })
  // }

  return (
    <Container>
      <div>
        <InputTextArea
          textFieldAttr={{width: '25vw', id: 'tried', label: '시도한 문제', marBot: '20px', marRig: '0px', isPw: false, isAf: false}}
          valid={checkSpace}
          errorMessage='시도한 문제들을 입력해주세요'
          setter={setTried}
          onKeyDown={() => {}}
        />
        <p id="resultTried" style={{fontSize: '0.8vw', marginTop: 0, marginBottom: 0}}></p>
      </div>
      <ButtonSubmitting
        submittingAttr={{text: '시도한 문제 제공', width: '12.5vw', height: '2.5vw', marBot: '0', fontSize: '1vw'}}
        isImportant={true}
        onClick={() => {}}
      />
    </Container>
  )
}
