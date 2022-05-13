import { useState } from 'react'
import { useRouter } from 'next/router'
import { axiosLogin } from '../../util/axiosCollection'
import InputTextField from '../common/input/InputTextField'
import ButtonSubmitting from '../common/button/ButtonSubmitting'
import ButtonRedirecting from '../common/button/ButtonRedirecting'
import styled from 'styled-components'
import { useSetRecoilState } from 'recoil'
import { userInfoState, bojIdState, memberIdState,algoIdState, accessTokenState, refreshTokenState } from '../../util/stateCollection'
import { stringify } from 'querystring'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Form() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const setUserInfo = useSetRecoilState(userInfoState)
  const setBoj = useSetRecoilState(bojIdState)
  const setMember = useSetRecoilState(memberIdState)
  const setAlgo = useSetRecoilState(algoIdState)
  const setAccessToken = useSetRecoilState(accessTokenState)
  const setRefreshToken = useSetRecoilState(refreshTokenState)
  const router = useRouter()

  const handleIdChange = (event: any) => {
    setId(event.target.value)
  }
  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value)
  }
  const handleClick = () => {
    if (id.trim() === '') {
    } else {
      axiosLogin(id, password)
        .then(res => {
          setUserInfo(res.data.data.member)
          setBoj(res.data.data.member.bojId)
          setMember(res.data.data.member.memberId)
          setAlgo(res.data.data.member.algopluzaId)
          setAccessToken(res.data.data.token.accessToken)
          setRefreshToken(res.data.data.token.refreshToken)
          router.push('/recommendation')
        })
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
          textFieldAttr={{width: '20vw', id: 'id', label: 'ID', password: false, autofocus: true}}
          valid={true}
          validMessage='알고풀자 아이디를 정확히 입력해 주세요.'
          onChange={handleIdChange}
          onKeyDown={() => {}}
        />
        <InputTextField
          textFieldAttr={{width: '20vw', id: 'password', label: 'Password', password: true, autofocus: false}}
          valid={true}
          validMessage='비밀번호를 정확히 입력해 주세요.'
          onChange={handlePasswordChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div>
        <ButtonSubmitting submittingAttr={{text: '로그인', width: '20vw'}} onClick={handleClick} />
        <ButtonRedirecting />
      </div>
    </Container>
  )
}
