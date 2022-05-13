import ButtonSubmitting from '../button/ButtonSubmitting'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { accessTokenState, memberIdState } from '../../../util/stateCollection'
import { axiosLogout } from '../../../util/axiosCollection'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Container = styled.section`
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
`

export default function Logout() {
  const router = useRouter()
  const memberId = useRecoilValue(memberIdState)
  const accessToken = useRecoilValue(accessTokenState)
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    setIsLogin(localStorage.getItem('recoil-persist') !== null ? true : false)
  }, [])

  const handleClick = () => {
    axiosLogout(memberId, accessToken)
      .then(res => {
        localStorage.removeItem('recoil-persist')
        router.push('/')
      })
  }

  return (
    <Container>
      {isLogin ? <ButtonSubmitting submittingAttr={{text: '로그아웃', width: '5vw', fontSize: '1.1vw'}} onClick={handleClick} /> : <></>}
    </Container>
  )
}
