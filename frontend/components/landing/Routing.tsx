import ButtonRouting from "../common/button/ButtonRouting"
import styled from "styled-components"
import { useEffect, useState } from "react"

const Container = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export type RoutingAttr = { url: string; text: string }

export default function Routing() {
  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    setIsLogin( window.localStorage.getItem("recoil-persist") !== null ? true : false )
  }, [])

  return (
    <Container>
      {isLogin ? ( <></> ) : (
        <ButtonRouting routingAttr={{ url: "/signup", text: "회원 가입" }} />
      )}
    </Container>
  )
}