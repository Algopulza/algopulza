import styled from "styled-components";
import { getBackgroundColor } from "../../../util/backgroundColor";
import Image from 'next/image'
import profile from '../../../public/analysis/userinfo/user.png'

const Container = styled.div`
  width: 30vw;
  height: 25vh;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const ProfileImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4rem;
  margin-right: 1rem;
  width:3rem;
  height:3rem;
`;

const Tier = styled.div<{bg : string}>`
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

type User = {
  profileImage : string
  algopluzaId: string
  bojId : string
  tierLevel: number
  tierName: string
}

export default function Userinfo({profileImage, algopluzaId, bojId, tierLevel, tierName}:User) {
  const backgroundColor = getBackgroundColor(tierName)
  return (
    <Container>
      <ProfileImage>
        <Image src={profile} alt="이미지를 찾을 수 없습니다." />
      </ProfileImage>
        <Tier bg={backgroundColor}>{tierLevel}</Tier>
        <NickName>{algopluzaId}</NickName>
    </Container>
  );
}
