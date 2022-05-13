import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Userinfo from "./Userinfo";
import Badge from "./Badge";
import Timer from "./Timer";
import { getUserInfo } from "../../../api/back/analysis/UserInfo";
import { User } from "../../../pages/mypage";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Index = ({accessToken, memberId}:User) => {
  const [userInfo, setUserInfo] = useState({
    profileImage:"",
    algopluzaId:"",
    bojId:"",
    tierLevel:0,
    tierName:"",
    exp:0
  });

  const AnalUser = async () => {
    await getUserInfo(accessToken, memberId)
      .then((res) => {
        console.log(res)
        setUserInfo(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    AnalUser();
  }, []);

  return (
    <Container>
      {userInfo?<Userinfo profileImage={userInfo.profileImage} algopluzaId={userInfo.algopluzaId} bojId={userInfo.bojId} tierLevel={userInfo.tierLevel} tierName={userInfo.tierName} />:null}
      {userInfo?<Badge exp={userInfo.exp} />:null}
      <Timer />
    </Container>
  );
};

export default Index;
