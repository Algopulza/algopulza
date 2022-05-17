import { useRouter } from 'next/router'
import InputTextField from '../common/input/InputTextField'
import ButtonSubmitting from '../common/button/ButtonSubmitting'
import styled from 'styled-components'
import { axiosLogin } from '../../util/axiosCollection'
import { useRecoilState, useSetRecoilState } from 'recoil'
import {
  bojIdState, memberIdState, algoIdState, accessTokenState, refreshTokenState, idState, passwordState, loginState
} from '../../util/stateCollection'
import { checkSpace } from '../../util/validationCollection'
import { sendLongMessage } from '../../util/inputHandlerCollection'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`

export default function Form() {
  const [id, setId] = useRecoilState(idState)
  const [password, setPassword] = useRecoilState(passwordState)
  const setBoj = useSetRecoilState(bojIdState)
  const setMember = useSetRecoilState(memberIdState)
  const setAlgo = useSetRecoilState(algoIdState)
  const setAccessToken = useSetRecoilState(accessTokenState)
  const setRefreshToken = useSetRecoilState(refreshTokenState)
  const router = useRouter()

  const handleClick = () => {
    axiosLogin(id, password)
      .then(res => {
        setBoj(res.data.data.member.bojId)
        setMember(res.data.data.member.memberId)
        setAlgo(res.data.data.member.algopluzaId)
        setAccessToken(res.data.data.token.accessToken)
        setRefreshToken(res.data.data.token.refreshToken)
        router.push('/recommendation')
      })
      .catch(err => {
        sendLongMessage('loginResult', '아이디와 비밀번호를 정확히 입력해주세요.')
      })
  }
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleClick()
    }
  }

  return (
    <Container>
      <div style={{marginBottom: 40}}>
        <InputTextField
          textFieldAttr={{width: '20vw', id: 'id', label: '아이디', marBot: '15px', marRig: '0px', isPw: false, isAf: true}}
          valid={checkSpace}
          errorMessage='알고풀자 아이디를 입력해 주세요.'
          setter={setId}
          onKeyDown={() => {}}
        />
        <InputTextField
          textFieldAttr={{width: '20vw', id: 'password', label: '비밀번호', marBot: '0px', marRig: '0px', isPw: true, isAf: false}}
          valid={checkSpace}
          errorMessage='비밀번호를 입력해 주세요.'
          setter={setPassword}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <ButtonSubmitting
          submittingAttr={{text: '로그인', width: '10vw', height: '2.3vw', marBot: '0px', fontSize: '1.1vw'}}
          isImportant={true}
          onClick={handleClick}
        />
        <p
          id="loginResult"
          style={{fontSize: '0.9vw', marginTop: '5px', marginBottom: '15px', color: 'red', textAlign: 'center'}}
        />
        <ButtonSubmitting
          submittingAttr={{text: '회원가입', width: '10vw', height: '2.3vw', marBot: '0px', fontSize: '1vw'}}
          isImportant={false}
          onClick={() => {router.push('/signup')}}
        />
      </div>
    </Container>
  )
}
