import styled from "styled-components";
import Image from "next/image";
import Seed1 from "../../../public/analysis/badge/seed1.png";
import Seed2 from "../../../public/analysis/badge/seed2.png";
import Seed3 from "../../../public/analysis/badge/seed3.png";
import Seed4 from "../../../public/analysis/badge/seed4.png";
import Seed5 from "../../../public/analysis/badge/seed5.png";

const Container = styled.div`
  width: 90%;
  height: 90%;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 1rem;
`;

const ProfileImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NickName = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 2rem;
  margin-left: 1rem;
`;

export default function Badge() {
  return (
    <Container>
      <ProfileImage>
        <Image src={Seed1} alt="이미지를 찾을 수 없습니다." />
      </ProfileImage>
      <RightContainer>
        <NickName>
          <Title>현재 새싹 등급이에요!</Title>
        </NickName>
      </RightContainer>
    </Container>
  );
}
