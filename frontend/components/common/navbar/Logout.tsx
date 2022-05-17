import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { accessTokenState, memberIdState } from '../../../util/stateCollection'
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

  const handleClick = () => {
    axiosLogout(memberId, accessToken)
      .then(res => {
        localStorage.removeItem('recoil-persist')
        router.push('/')
      })
  }

  return (
    <Container>
      <Text onClick={handleClick}>로그아웃</Text>
    </Container>
  )
}
