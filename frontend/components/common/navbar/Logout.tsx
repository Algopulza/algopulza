import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { accessTokenState, memberIdState } from '../../../util/stateCollection'
import { axiosLogout } from '../../../util/axiosCollection'
import { useEffect, useState } from 'react'

const Container = styled.section`
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
`

const Text = styled.span`
  margin-right: 20px;
  font-size: 1vw;
  color: #FFFFFF;
  cursor: pointer;
  &:hover {
    color: #FFC94D;
  }
`

export default function Logout() {
  const router = useRouter()
  const memberId = useRecoilValue(memberIdState)
  const accessToken = useRecoilValue(accessTokenState)
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    setIsLogin(window.localStorage.getItem('recoil-persist') !== null ? true : false)
  }, [])

  const handleClick = () => {
    axiosLogout(memberId, accessToken)
      .then(res => {
        localStorage.removeItem('recoil-persist')
        router.push('/')
      })
  }
  const handleClickNotUser = () => {
    router.push('/')
  }

  return (
    <Container>
      <Text onClick={isLogin ? handleClick : handleClickNotUser}>{isLogin ? '로그아웃' : '뒤로가기'}</Text>
    </Container>
  )
}
