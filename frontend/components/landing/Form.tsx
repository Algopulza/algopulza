import { useRouter } from 'next/router'
import InputTextField from '../common/input/InputTextField'
import ButtonSubmitting from '../common/button/ButtonSubmitting'
import ButtonRedirecting from '../common/button/ButtonRedirecting'
import styled from 'styled-components'
import { axiosLogin } from '../../util/axiosCollection'
import { useRecoilState, useSetRecoilState } from 'recoil'
import {
  bojIdState, memberIdState, algoIdState, accessTokenState, refreshTokenState, idState, passwordState, loginState
} from '../../util/stateCollection'
import { checkSpace } from '../../util/validationCollection'
import { useEffect, useState } from 'react'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Form() {
  const [isLogin, setIsLogin] = useState(false)
  const [id, setId] = useRecoilState(idState)
  const [password, setPassword] = useRecoilState(passwordState)
  const setBoj = useSetRecoilState(bojIdState)
  const setMember = useSetRecoilState(memberIdState)
  const setAlgo = useSetRecoilState(algoIdState)
  const setAccessToken = useSetRecoilState(accessTokenState)
  const setRefreshToken = useSetRecoilState(refreshTokenState)
  const router = useRouter()

  useEffect(() => {
    setIsLogin(window.localStorage.getItem('recoil-persist') !== null ? true : false)
  }, [])

  const handleClick = () => {
    axiosLogin(id, password)
      .then(res => {
        setBoj(res.data.data.member.bojId)
        setMember(res.data.data.member.memberId)
        setAlgo(res.data.data.member.algopluzaId)
        setAccessToken(res.data.data.token.accessToken)
        setRefreshToken(res.data.data.token.refreshToken)
        setIsLogin(true)
        router.push('/recommendation')
      })
  }
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleClick()
    }
  }

  return (
    <Container>
      {isLogin ?
        <></> :
        <div style={{marginBottom: 40}}>
          <InputTextField
            textFieldAttr={{width: '20vw', id: 'id', label: 'ID', marBot: '15px', marRig: '0px', isPw: false, isAf: true}}
            valid={checkSpace}
            errorMessage='알고풀자 아이디를 입력해 주세요.'
            setter={setId}
            onKeyDown={() => {}}
          />
          <InputTextField
            textFieldAttr={{width: '20vw', id: 'password', label: 'Password', marBot: '0px', marRig: '0px', isPw: true, isAf: false}}
            valid={checkSpace}
            errorMessage='비밀번호를 입력해 주세요.'
            setter={setPassword}
            onKeyDown={handleKeyDown}
          />
        </div>
      }

      <div>
        {isLogin ?
          <ButtonSubmitting
            submittingAttr={{text: '시작하기', width: '20vw', marBot: '0px', fontSize: '1.1vw'}}
            isImportant={true}
            onClick={handleClick}
          /> :
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <ButtonSubmitting
              submittingAttr={{text: '로그인', width: '20vw', marBot: '15px', fontSize: '1.1vw'}}
              isImportant={true}
              onClick={handleClick}
            />
            <ButtonSubmitting
              submittingAttr={{text: '회원가입', width: '20vw', marBot: '0px', fontSize: '1vw'}}
              isImportant={false}
              onClick={() => {router.push('/signup')}}
            />
          </div>
        }
        <ButtonRedirecting />
      </div>
    </Container>
  )
}
