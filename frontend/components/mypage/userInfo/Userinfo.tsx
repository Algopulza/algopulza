import styled from "styled-components";
import { getBackgroundColor } from "../../../util/backgroundColor";
import Image from "next/image";
import profile from "../../../public/analysis/userinfo/user.png";
import AnalyCard from "../../common/card/AnalyCard";

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProfileImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4rem;
  margin-right: 1rem;
  width: 3rem;
  height: 3rem;
`;

const Tier = styled.div<{ bg: string }>`
  border-radius: 10px;
  height: 3rem;
  width: 3rem;
  color: white;
  background-color: ${(props) => (props.bg ? props.bg : "")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NickName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 2rem;
  margin-left: 1rem;
`;

const BottomContainer = styled.div`
display: flex;
flex-direction: row;
margin-top: 1rem;
`;

const Text = styled.span`
  font-weight: bold;
  color: #0864B9;
  margin-left:5px;
`

type User = {
  algopluzaId: string;
  tierLevel: number;
  tierName: string;
  time: number;
};

export default function Userinfo({algopluzaId, tierLevel, tierName, time}: User) {
  const backgroundColor = getBackgroundColor(tierName);
  return (
    <AnalyCard>
      <TopContainer>
        <ProfileImage>
          <Image src={profile} alt="이미지를 찾을 수 없습니다." />
        </ProfileImage>
        <Tier bg={backgroundColor}>{tierLevel}</Tier>
        <NickName>{algopluzaId}</NickName>
      </TopContainer>
      <BottomContainer>
        알고리즘을 총 <Text>{time}분</Text> 동안 풀었어요!
      </BottomContainer>
      </AnalyCard>
  );
}
