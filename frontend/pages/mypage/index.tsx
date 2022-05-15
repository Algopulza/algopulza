import styled from "styled-components";
import { ReactElement } from "react";
import Layout from "../../components/common/Layout";
import UserInfo from "../../components/mypage/userInfo/Index";
import Analysis from "../../components/mypage/analysis/Index";
import Record from "../../components/mypage/record/Index";
import { useRecoilValue } from "recoil";
import { memberIdState, bojIdState, accessTokenState } from "../../util/stateCollection";
import { useState } from "react";

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 0.1fr 1fr;
  padding: 3rem 3rem;
  max-height: 100vh;
`;

const TopContainer = styled.div``;

const Select = styled.div`
  display: inline-flex;
  flex-direction: row;
  margin: auto;
  font-size: 2rem;
  font-weight: bold;
  margin-top: 2rem;
`

const CategoryButton = styled.a`
  display: inline-block;
  color: ${(props) => (props.color ? props.color : "")};
  cursor: pointer;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 400;
  margin : 0 1rem;
  font-size: 2rem;
  font-weight: bold;
`

const SubContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export type User = {
  accessToken : string
  memberId : number
  bojId : string
}

export default function Mypage() {
  const [analysis, setAnalysis] = useState(true);
  const [record, setRecord] = useState(false);

  const accessToken = useRecoilValue(accessTokenState);
  const memberId = useRecoilValue(memberIdState);
  const bojId = useRecoilValue(bojIdState);

 


  const showAnalysis = async() => {
    setAnalysis(true as any);
    setRecord(false as any);
  };

  const showRecord = async() => {
    setAnalysis(false as any);
    setRecord(true as any);
  };

  return (
    <Container>
      <TopContainer>
        <UserInfo accessToken={accessToken} memberId={memberId} bojId={bojId}/>
      </TopContainer>
      <Select>
      <CategoryButton onClick={showAnalysis} color={analysis?"black":"#C4C4C4"}>분석</CategoryButton>
      |
      <CategoryButton onClick={showRecord} color={record?"black":"#C4C4C4"}>기록</CategoryButton>
      </Select>
      <SubContainer>
          {analysis ? <Analysis accessToken={accessToken} memberId={memberId} bojId={bojId}/> : null}
          {record ? <Record /> : null}
      </SubContainer>
    </Container>
  );
}

Mypage.getLayout = function getLayout(analysis: ReactElement) {
  return <Layout>{analysis}</Layout>;
};