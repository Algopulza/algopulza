import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { axiosLogin } from '../../util/axiosCollection'
import InputTextField from '../common/InputTextField'
import ButtonSubmitting from '../common/button/ButtonSubmitting'
import ButtonRedirecting from '../common/button/ButtonRedirecting'
import styled from 'styled-components'
import { useSetRecoilState } from 'recoil'
import { userInfoState, bojIdState, memberIdState, accessTokenState, refreshTokenState } from '../../util/stateCollection'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Form() {
  const [bojId, setBojId] = useState('')
  const [valid, setValid] = useState(true)
  const setUserInfo = useSetRecoilState(userInfoState)
  const setBoj = useSetRecoilState(bojIdState)
  const setMember = useSetRecoilState(memberIdState)
  const setAccessToken = useSetRecoilState(accessTokenState)
  const setRefreshToken = useSetRecoilState(refreshTokenState)

  useEffect(() => {
    setIsLogin(localStorage.getItem('recoil-persist') !== null ? true : false)
  }, [])
  const [isLogin, setIsLogin] = useState(true)

  const handleChange = (event: any) => {
    setBojId(event.target.value)
  }
  const router = useRouter()
  const handleClick = () => {
    if (bojId.trim() === '') {
      setValid(false)
    } else {
      setValid(true)
      axiosLogin(bojId)
        .then(res => {
          // console.log(res.data.data)
          setUserInfo(res.data.data.member)
          setBoj(res.data.data.member.bojId)
          setMember(res.data.data.member.memberId)
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

  const text = isLogin ? '시작하기' : '로그인'

  return (
    <Container>
      <div style={{marginBottom: 40}}>
        <InputTextField
          textFieldAttr={{width: '20vw', id: 'bojId', label: 'BOJ ID', password: false, autofocus: true}}
          valid={valid}
          validMessage='백준 아이디를 정확히 입력해 주세요.'
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div>
        <ButtonSubmitting submittingAttr={{text: text, width: '20vw'}} onClick={handleClick} />
        <ButtonRedirecting />
      </div>
    </Container>
  )
}
