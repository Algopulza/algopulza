import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Userinfo from "./Userinfo";
import Badge from "./Badge";
import Stopwatch from "./Stopwatch";
import { getUserInfo } from "../../../api/back/analysis/UserInfo";
import { getStatistic } from "../../../api/back/analysis/Statistic";
import { User } from "../../../pages/mypage";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
`;

const Index = ({accessToken, memberId}:User) => {
  const [userInfo, setUserInfo] = useState({
    algopluzaId:"",
    tierLevel:0,
    tierName:"",
    exp:0
  });
  
  const [timeInfo, setTimeInfo] = useState({totalSolvingTime:0})
  const time = timeInfo.totalSolvingTime

  const AnalUser = async () => {
    await getUserInfo(accessToken, memberId)
      .then((res) => {
        setUserInfo(res.data.data)
      })
      .catch((err) => console.log(err))
  };

  const Time = async () => {
    await getStatistic(accessToken)
      .then((res) => {
        setTimeInfo(res.data.data)
      })
      .catch((err) => console.log(err))
  };

  useEffect(() => {
    AnalUser()
    Time()
  }, []);

  return (
    <Container>
      {userInfo?<Userinfo algopluzaId={userInfo.algopluzaId} tierLevel={userInfo.tierLevel} tierName={userInfo.tierName} time={time}/>:null}
      {userInfo?<Badge exp={userInfo.exp} />:null}
      <Stopwatch />
    </Container>
  );
};

export default Index;
