import { useState } from 'react'
import { useRouter } from 'next/router'
import InputTextField from '../common/input/InputTextField'
import ButtonSubmitting from '../common/button/ButtonSubmitting'
import ProblemHelper from './ProblemHelper'
import styled from 'styled-components'
import { axiosId } from '../../util/axiosCollection'
import { handleSignupClick } from '../../util/inputHandlerCollection'
import { useRecoilState } from 'recoil'
import { bojIdSignupState, idState, passwordState, pwConfirmState, solvedState, triedState } from '../../util/stateCollection'
import { checkId, checkPassword, checkSpace, nothing } from '../../util/validationCollection'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 8fr 2.5fr;
  align-items: center;
  margin-bottom: 10px;
  width: 40vw;
`

const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function Form() {
  const [isCheck, setIsCheck] = useState(false)
  const [id, setId] = useRecoilState(idState)
  const [bojId, setBojId] = useRecoilState(bojIdSignupState)
  const [password, setPassword] = useRecoilState(passwordState)
  const [pwConfirm, setPwConfirm] = useRecoilState(pwConfirmState)
  const [solved, setSolved] = useRecoilState(solvedState)
  const [tried, setTried] = useRecoilState(triedState)
  const router = useRouter()

  const handleIdClick = (event: any, id: string) => {
    if (id.trim() === '') {
      console.log('not valid')
    } else {
      console.log(`전송id: ${id}`)
      axiosId(id)
        .then(res => {
          const idResult = document.getElementById('idResult')
          idResult!.innerText = res.data.data ? '중복입니다.' : '가능합니다.'
          setIsCheck(res.data.data)
        })
    }
  }

  return (
    <Container>     
      <Row>
        <Cell>
          <div>
            <InputTextField
              textFieldAttr={{width: '25vw', id: 'id', label: '아이디', marBot: '0', marRig: '0px', isPw: false, isAf: true}}
              valid={checkId}
              errorMessage='2 글자 이상의 영문자 및 숫자이어야 합니다.'
              setter={setId}
              onKeyDown={() => {}}
            />
            <p id="idResult" style={{fontSize: '1vw', marginTop: 0, marginBottom: 0, color: 'red'}}></p>
          </div>
        </Cell>
        <Cell>
          <ButtonSubmitting
            submittingAttr={{text: '중복 확인', width: '5vw', height: '2.5vw', marBot: '0px', fontSize: '1vw'}}
            isImportant={false}
            onClick={() => {handleIdClick(event, id)}}
          />
        </Cell>
        <div></div>
      </Row>

      <Row>
        <Cell>
          <InputTextField
            textFieldAttr={{width: '25vw', id: 'bojId', label: '백준 아이디', marBot: '0', marRig: '0px', isPw: false, isAf: false}}
            valid={nothing}
            errorMessage='백준 아이디를 입력해주세요.'
            setter={setBojId}
            onKeyDown={() => {}}
          />
        </Cell>
        <div></div>
        <div></div>
      </Row>

      <Row>
        <Cell>
          <InputTextField
            textFieldAttr={{width: '25vw', id: 'password', label: '비밀번호', marBot: '0px', marRig: '0px', isPw: true, isAf: false}}
            valid={checkPassword}
            errorMessage='8~14 글자의 영문자 및 특수문자이어야 합니다.'
            setter={setPassword}
            onKeyDown={() => {}}
          />
        </Cell>
        <div></div>
        <div></div>
      </Row>

      <Row>
        <Cell>
          <InputTextField
            textFieldAttr={{width: '25vw', id: 'pwConfirm', label: '비밀번호 확인', marBot: '0px', marRig: '0px', isPw: true, isAf: false}}
            valid={nothing}
            errorMessage='동일한 비밀번호를 입력해주세요.'
            setter={setPwConfirm}
            onKeyDown={() => {}}
          />
        </Cell>
        <div></div>
        <div></div>
      </Row>

      <Row>
        <Cell>
          <InputTextField
            textFieldAttr={{width: '25vw', id: 'solved', label: '해결한 문제', marBot: '0px', marRig: '0px', isPw: false, isAf: false}}
            valid={checkSpace}
            errorMessage='해결한 문제들을 공백 없이 입력해주세요.'
            setter={setSolved}
            onKeyDown={() => {}}
          />
        </Cell>
        <Cell>
          <ProblemHelper />
        </Cell>
      </Row>

      <Row>
        <Cell>
          <InputTextField
            textFieldAttr={{width: '25vw', id: 'tried', label: '시도한 문제', marBot: '0px', marRig: '0px', isPw: false, isAf: false}}
            valid={checkSpace}
            errorMessage='시도한 문제들을 공백 없이 입력해주세요'
            setter={setTried}
            onKeyDown={() => {}}
          />
        </Cell>
      </Row>

      <Row>
        <Cell>
          <div>
            <ButtonSubmitting
              submittingAttr={{text: '회원 가입', width: '25vw', height: '2.5vw', marBot: '0px', fontSize: '1.1vw'}}
              isImportant={true}
              onClick={() => {handleSignupClick(event, id, bojId, password, pwConfirm, solved, tried, isCheck, router)}}
            />
            <p
              id="signupResult"
              style={{fontSize: '1vw', marginTop: 0, marginBottom: 0, color: 'red', textAlign: 'center'}}
            />
          </div>
        </Cell>
      </Row>
    </Container>
  )
}
