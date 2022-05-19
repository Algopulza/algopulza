import styled from "styled-components";
import { ReactElement } from "react";
import Layout from "../../components/common/Layout";
import UserInfo from "../../components/mypage/userInfo/Index";
import Analysis from "../../components/mypage/analysis/Index";
import Record from "../../components/mypage/record/Index";
import { useRecoilValue } from "recoil";
import { memberIdState, bojIdState, accessTokenState } from "../../util/stateCollection";
import ButtonFloating from "../../components/common/button/ButtonFloating";
import { GetServerSideProps } from "next";

const Container = styled.div`
  display: grid;
  grid-template-rows: 0.1fr 0.1fr 0.1fr;
  gap: 2rem;
  padding: 80px 10vw;
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
      <ButtonFloating />
    </Container>
  );
}

Mypage.getLayout = function getLayout(analysis: ReactElement) {
  return <Layout>{analysis}</Layout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const token = req.cookies.accessToken;

  if (!token) {
    return {
      redirect: {
        destination: "/",
        statusCode: 302,
      },
    };
  }

  return {
    props: {},
  };
};