import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  height: 90%;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Tier = styled.div`
  border-radius: 10px;
  height: 5rem;
  width: 3rem;
  color: white;
  background-color: #27e2a4;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
`;

const NickName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 2rem;
  margin-left: 1rem;
`;

const Email = styled.div``;

export default function Userinfo() {
  return (
    <Container>
      <LeftContainer>
        <Tier>5</Tier>
      </LeftContainer>
      <RightContainer>
        <NickName>runkey</NickName>
        <Email>runkey@gmail.com</Email>
      </RightContainer>
    </Container>
  );
}
