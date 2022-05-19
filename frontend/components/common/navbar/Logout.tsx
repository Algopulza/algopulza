import { useRouter } from "next/router"
import styled from "styled-components"
import { useRecoilState, useResetRecoilState } from "recoil"
import { accessTokenState, algoIdState, bojIdState,
  idState, memberIdState, refreshTokenState } from "../../../util/stateCollection"
import { axiosLogout } from "../../../util/axiosCollection"
import { useEffect, useState } from "react"
import { delCookie } from "../../../util/cookieHandler"

const Container = styled.section`
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
`

const Text = styled.span`
  margin-right: 20px;
  font-size: 1vw;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    color: #ffc94d;
  }
`

export default function Logout() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [bojId, setbojId] = useRecoilState(bojIdState);
  const [memberId, setMemberId] = useRecoilState(memberIdState);
  
  const resetId = useResetRecoilState(idState)
  const resetUserId = useResetRecoilState(bojIdState)
  const resetAlgoId = useResetRecoilState(algoIdState)
  const resetAccssToken = useResetRecoilState(accessTokenState)
  const resetRefreshToken = useResetRecoilState(refreshTokenState)

  useEffect(() => {
    setIsLogin(accessToken === "" ? false : true)
  }, [])

  const handleClick = () => {
    axiosLogout(memberId, accessToken).then((res) => {
      localStorage.removeItem("recoil-persist")
      resetId()
      resetUserId()
      resetAlgoId()
      resetAccssToken()
      resetRefreshToken()
      delCookie("accessToken")
      router.push("/")
    })
  }

  const handleClickNotUser = () => {
    router.push("/")
  }

  return (
    <Container>
      <Text onClick={isLogin ? handleClick : handleClickNotUser}>
        {isLogin ? "로그아웃" : "뒤로가기"}
      </Text>
    </Container>
  )
}