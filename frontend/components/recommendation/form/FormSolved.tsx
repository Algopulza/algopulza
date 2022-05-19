import InputTextArea from '../../common/input/InputTextArea'
import ButtonSubmitting from '../../common/button/ButtonSubmitting'
import styled from 'styled-components'
import { useRecoilState, useRecoilValue } from 'recoil'
import { accessTokenState, bojIdState, solvedState } from '../../../util/stateCollection'
import { checkSpace } from '../../../util/validationCollection'
import { axiosSolved } from '../../../util/axiosCollection'
import { showToast } from '../../common/alert/Alert'
import Button from '@mui/material/Button';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`
const AreaTitle = styled.span`
  font-size: 1.3em;
  font-weight: bold;
  color: #009874;
  padding-bottom: 0.3em;
`
const SubmitButton = styled.button`
  background-color: #545454;
  color: #FFFFFF;
  font-size: 0.8em;
  font-weight: bold;
  padding: 0.3em 1.5em;
  border: none;
  border-radius: 0.25em;
  cursor: pointer;
  &:hover{
    transition: 0.25s ease-out;
    opacity: 0.7;
  }
  &:not(:hover){
    transition: 0.25s ease-out;
  }
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
      <AreaTitle>solved</AreaTitle>
      <InputTextArea
        textFieldAttr={{width: '20vw', id: 'solved', label: '해결한 문제', marBot: '10px', marRig: '0px', isPw: false, isAf: false}}
        valid={checkSpace}
        errorMessage='해결한 문제들을 입력해주세요.'
        setter={setSolved}
        onKeyDown={() => {}}
      />
      <SubmitButton onClick={handleClick}>제출</SubmitButton>
    </Container>
  )
}
