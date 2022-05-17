import styled from "styled-components";
import { ReactElement } from "react";
import Layout from "../components/common/Layout";
import UserInfo from "../components/mypage/userInfo/Index";
import Analysis from "../components/mypage/analysis/Index";
import Record from "../components/mypage/record/Index";
import { useRecoilValue } from "recoil";
import { memberIdState, bojIdState, accessTokenState } from "../util/stateCollection";

const Container = styled.div`
  display: grid;
  grid-template-rows: 0.2fr 0.8fr 0.5fr;
  padding: 3vh 10vw;
  gap: 3rem;
`

export type User = {
  accessToken : string
  memberId : number
  bojId : string
}

export default function Mypage() {
  const accessToken = useRecoilValue(accessTokenState)
  const memberId = useRecoilValue(memberIdState)
  const bojId = useRecoilValue(bojIdState)

  return (
    <Container>
        <UserInfo accessToken={accessToken} memberId={memberId} bojId={bojId}/>
        <Analysis accessToken={accessToken} memberId={memberId} bojId={bojId}/> 
        <Record />
    </Container>
  );
}

Mypage.getLayout = function getLayout(analysis: ReactElement) {
  return <Layout>{analysis}</Layout>
}
