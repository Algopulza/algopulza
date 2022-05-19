import { useState } from 'react'
import { useRouter } from 'next/router'
import InputTextField from '../common/input/InputTextField'
import ButtonSubmitting from '../common/button/ButtonSubmitting'
import ButtonSubmittingOutlined from '../common/button/ButtonSubmittingOutlined'
import styled from 'styled-components'
import { axiosId } from '../../util/axiosCollection'
import { handleSignupClick, sendLongMessage } from '../../util/inputHandlerCollection'
import { useRecoilState } from 'recoil'
import { bojIdSignupState, idState, passwordState, pwConfirmState } from '../../util/stateCollection'
import { checkId, checkPassword, nothing } from '../../util/validationCollection'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 2.5vw;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  margin-bottom: 10px;
`

const CellLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const CellRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export default function Form() {
  const [isCheck, setIsCheck] = useState(false)
  const [isSame, setIsSame] = useState(false)
  const [id, setId] = useRecoilState(idState)
  const [bojId, setBojId] = useRecoilState(bojIdSignupState)
  const [password, setPassword] = useRecoilState(passwordState)
  const [pwConfirm, setPwConfirm] = useRecoilState(pwConfirmState)
  const router = useRouter()

  const handleIdClick = (event: any, id: string) => {
    if (id.trim() === '') {
      sendLongMessage('signupMessage', '아이디를 먼저 입력해주세요.')
    } else {
      axiosId(id)
        .then(res => {
          setIsCheck(true)
          setIsSame(res.data.data)
          { res.data.data ?
            sendLongMessage('signupMessage', '중복된 아이디입니다.') :
            sendLongMessage('signupMessage', '가능한 아이디입니다.')
          }
        })
    }
  }

  return (
    <Container>     
      <Row>
        <CellLeft>
          <InputTextField
            textFieldAttr={{width: '14vw', id: 'id', label: '아이디', marBot: '0', marRig: '0px', isPw: false, isAf: true}}
            valid={checkId}
            errorMessage='2 글자 이상의 영문자 및 숫자이어야 합니다.'
            setter={setId}
            onKeyDown={() => {}}
          />
        </CellLeft>
        <CellRight>
          <ButtonSubmittingOutlined
            submittingAttr={{text: '중복확인', width: '4.3vw', height: '2.6vw', marBot: '0px', fontSize: '0.8vw'}}
            isImportant={false}
            onClick={() => {handleIdClick(event, id)}}
          />
        </CellRight>
      </Row>

      <Row>
        <CellLeft>
          <InputTextField
            textFieldAttr={{width: '14vw', id: 'bojId', label: '백준 아이디', marBot: '0', marRig: '0px', isPw: false, isAf: false}}
            valid={nothing}
            errorMessage='백준 아이디를 입력해주세요.'
            setter={setBojId}
            onKeyDown={() => {}}
          />
        </CellLeft>
      </Row>

      <Row>
        <CellLeft>
          <InputTextField
            textFieldAttr={{width: '14vw', id: 'password', label: '비밀번호', marBot: '0px', marRig: '0px', isPw: true, isAf: false}}
            valid={checkPassword}
            errorMessage='8~14 글자의 영문자 및 특수문자이어야 합니다.'
            setter={setPassword}
            onKeyDown={() => {}}
          />
        </CellLeft>
      </Row>

      <Row style={{marginBottom: '20px'}}>
        <CellLeft>
          <div>
            <InputTextField
              textFieldAttr={{width: '14vw', id: 'pwConfirm', label: '비밀번호 확인', marBot: '20px', marRig: '0px', isPw: true, isAf: false}}
              valid={nothing}
              errorMessage='동일한 비밀번호를 입력해주세요.'
              setter={setPwConfirm}
              onKeyDown={() => {}}
            />
          <p id='signupMessage' style={{textAlign: 'center', fontSize: '0.9vw', color: 'red', margin: '10px 0 0 0'}}></p>
          </div>
        </CellLeft>
      </Row>

      <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <ButtonSubmitting
          submittingAttr={{text: '회원 가입', width: '10vw', height: '2.3vw', marBot: '0px', fontSize: '1.1vw'}}
          isImportant={true}
          onClick={() => {handleSignupClick(event, id, bojId, password, pwConfirm, isCheck, isSame, router)}}
        />
      </Row>
    </Container>
  )
}
