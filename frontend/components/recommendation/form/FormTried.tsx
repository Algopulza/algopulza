import InputTextField from '../../common/input/InputTextField'
import ButtonSubmitting from '../../common/button/ButtonSubmitting'
import { axiosTried } from '../../../util/axiosCollection'
import styled from 'styled-components'
import { useRecoilState, useRecoilValue } from 'recoil'
import { accessTokenState, bojIdState, triedState } from '../../../util/stateCollection'
import { checkSpace } from '../../../util/validationCollection'

const Container = styled.section`
  display: grid;
  grid-template-rows: 6fr 4fr;
  padding: 20px 0 20px 0;
`

export default function FormTried() {
  const [tried, setTried] = useRecoilState(triedState)
  const bojId = useRecoilValue(bojIdState)
  const accessToken = useRecoilValue(accessTokenState)
  let result = document.getElementById('resultTried')

  const handleClick = (event: any) => {
    axiosTried(bojId, tried, accessToken)
      .then(res => {
        result!.innerText = '감사합니다!'
      })
  }

  return (
    <Container>
      <div>
        <InputTextField
          textFieldAttr={{width: '15vw', id: 'tried', label: 'Tried Problems', marBot: '10px', marRig: '0px', isPw: false, isAf: false}}
          valid={checkSpace}
          errorMessage='시도한 문제들을 입력해주세요'
          setter={setTried}
          onKeyDown={() => {}}
        />
        <p id="resultTried" style={{fontSize: '1vw', marginTop: 0, marginBottom: 0}}></p>
      </div>
      <ButtonSubmitting
        submittingAttr={{text: '제공', width: '15vw', marBot: '15px', fontSize: '1.1vw'}}
        isImportant={true}
        onClick={handleClick}
      />
    </Container>
  )
}
