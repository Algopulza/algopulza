import { useRouter } from 'next/router'
import InputTextField from '../common/input/InputTextField'
import ButtonSubmitting from '../common/button/ButtonSubmitting'
import styled from 'styled-components'
import { axiosLogin } from '../../util/axiosCollection'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { bojIdState, memberIdState, algoIdState, accessTokenState, refreshTokenState, idState, passwordState } from '../../util/stateCollection'
import { checkSpace } from '../../util/validationCollection'
import ButtonRouting from '../common/button/ButtonRouting'
import PopupLogin from '../common/alert/PopupLogin'
import { setCookie } from '../../util/cookieHandler'
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
  const setAlgoId = useSetRecoilState(algoIdState)
  const setBojId = useSetRecoilState(bojIdState)
  const setMemberId = useSetRecoilState(memberIdState)
  const setAccessToken = useSetRecoilState(accessTokenState)
  const setRefreshToken = useSetRecoilState(refreshTokenState)
  const router = useRouter()

  const handleClick = () => {
    if (id.trim() !== '' || password.trim() !== '') {
      axiosLogin(id, password)
        .then(res => {
          setAlgoId(res.data.data.member.algopluzaId)
          setBojId(res.data.data.member.bojId)
          setMemberId(res.data.data.member.memberId)
          setAccessToken(res.data.data.token.accessToken)
          setRefreshToken(res.data.data.token.refreshToken)
          setCookie('accessToken', res.data.data.token.accessToken, 1)
          router.push('/recommendation')
        })
        .catch(err => {
          sendLongMessage('loginMessage', '아이디와 비밀번호를 정확히 입력해주세요.')
        })
    } else {
      sendLongMessage('loginMessage', '아이디와 비밀번호를 정확히 입력해주세요.')
    }
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
        <p id='loginMessage' style={{textAlign: 'center', fontSize: '0.9vw', color: 'red', margin: '10px 0 0 0'}}></p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ButtonSubmitting
          submittingAttr={{text: '로그인', width: '12vw', height: '2.3vw', marBot: '10px', fontSize: '1.1vw'}}
          isImportant={true}
          onClick={handleClick}
        />
        <PopupLogin />
        
        <ButtonRouting routingAttr={{url: '/signup', text: '회원가입'}}  />
      </div>
    </Container>
  )
}
