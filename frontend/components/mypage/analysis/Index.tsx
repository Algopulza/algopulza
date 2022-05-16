import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Weakness from "./Weakness";
import Tag from "./Tag";
import Language from "./Language";
import Month from "./Month";
import Solved from "./Solved";
import Code from "./Code";
import { User } from "../../../pages/mypage";
import { getStatistic } from "../../../api/back/analysis/Statistic";
import Time from "./Time";

const Container = styled.div`
  display: grid;
  grid-template-rows: 0.5fr 0.5fr;
`;

const TopContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;
`;

const BottomContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 1.5rem;
`;

const BottomRight = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const Index = ({accessToken, memberId, bojId}:User) => {
  const [userInfo, setUserInfo] = useState({totalSolvedCount:0, totalSolvedCodeLength:0, totalSolvingTime:0});

  const solved = userInfo.totalSolvedCount
  const length = userInfo.totalSolvedCodeLength
  const time = userInfo.totalSolvingTime

  const AnalUser = async () => {
    await getStatistic(accessToken)
      .then((res) => {
        console.log(res.data.data)
        setUserInfo(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    AnalUser();
  }, []);
  return (
    <Container>
      <TopContainer>
        <Weakness accessToken={accessToken} memberId={memberId} bojId={bojId}/>
        <Tag accessToken={accessToken} memberId={memberId} bojId={bojId}/>
        <Language accessToken={accessToken} memberId={memberId} bojId={bojId}/>
      </TopContainer>

      <BottomContainer>
        <Month accessToken={accessToken} memberId={memberId} bojId={bojId}/>
        <BottomRight>
          <Solved solved={solved}/>
          <Code length={length}/>
          <Time time={time}/>
        </BottomRight>
      </BottomContainer>
    </Container>
  );
};

export default Index;
