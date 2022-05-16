import styled from "styled-components";
import { ReactElement } from "react";
import Layout from "../../components/common/Layout";
import UserInfo from "../../components/mypage/userInfo/Index";
import Analysis from "../../components/mypage/analysis/Index";
import Record from "../../components/mypage/record/Index";
import { useRecoilValue } from "recoil";
import { memberIdState, bojIdState, accessTokenState } from "../../util/stateCollection";
import Seed1 from "../../public/analysis/badge/seed1.png"
import Seed2 from "../../public/analysis/badge/seed2.png"
import Seed3 from "../../public/analysis/badge/seed3.png"
import Seed4 from "../../public/analysis/badge/seed4.png"
import Seed5 from "../../public/analysis/badge/seed5.png"
import Image from "next/image";

const Container = styled.div`
  display: grid;
  grid-template-rows: 0.2fr 0.8fr 0.5fr;
  margin: 3vh 5vw;
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
    <Image src={Seed1} alt="이미지를 찾을 수 없습니다." />
    <Image src={Seed2} alt="이미지를 찾을 수 없습니다." />
    <Image src={Seed3} alt="이미지를 찾을 수 없습니다." />
    <Image src={Seed4} alt="이미지를 찾을 수 없습니다." />
    <Image src={Seed5} alt="이미지를 찾을 수 없습니다." />
        <UserInfo accessToken={accessToken} memberId={memberId} bojId={bojId}/>
        <Analysis accessToken={accessToken} memberId={memberId} bojId={bojId}/> 
        <Record />
    </Container>
  );
}

Mypage.getLayout = function getLayout(analysis: ReactElement) {
  return <Layout>{analysis}</Layout>
}
