import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { accessTokenState, idState, memberIdState, passwordState } from '../../../util/stateCollection'
import { axiosLogout } from '../../../util/axiosCollection'

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
  const setId = useSetRecoilState(idState)
  const setPassword = useSetRecoilState(passwordState)

  const handleClick = () => {
    axiosLogout(memberId, accessToken)
      .then(res => {
        localStorage.removeItem('recoil-persist')
        setId('')
        setPassword('')
        router.push('/')
      })
  }

  return (
    <Container>
      <Text onClick={handleClick}>로그아웃</Text>
    </Container>
  )
}
