import styled from "styled-components";
import LandingCarousel from "components/Landing/LandingCarousel";

const Container = styled.div`
  display: grid;
  grid-template-columns: 7fr 5fr;
  width: 100vw;
  height: 100vh;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem;
`;

const Title = styled.div`
  font-size: 6rem;
  font-family: GmarketSansBold;
  margin-top: 1rem;
`;

const Sub = styled.div`
  margin-top: 4rem;
`;

const Text = styled.div`
  color: #c4c4c4;
  margin-top: 0.5rem;
  text-align: center;
  a {
    color: #ffb305;
    cursor: pointer;
    text-decoration: none;
  }
`;

const Button = styled.button`
  margin-top: 4rem;
  margin-bottom: 1rem;
  width: 10rem;
  height: 3rem;
  font-size: 1rem;
  font-weight: 600;
  font-family: GmarketSansMedium;
  background-color: #ffc94d;
  color: white;
  border: none;
  border-radius: 10px;
  transition: 0.2s;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  &:hover {
    background-color: #dca03a;
  }
`;
const Landing = () => {
  return (
    <Container>
        <LandingCarousel />
      <RightContainer>
        <Title>알고ㅤ</Title>
        <Title>ㅤ풀자</Title>
        <Sub>
          <Text>
            타닥 타닥. 탁. 어. 어려워ㅜ. 탁타닥 타닥. 탁. 불. 불합격ㅜ
          </Text>
          <Text>우리의 꿈, 우리의 목표, 멀고도 험난한 코테 합격의 길.</Text>
          <Text>모든 개발자 취업을 꿈꾸는 취준생 여러분을 위해.</Text>
          <Text>
            실력을 분석하고 문제를 추천해드립니다. 문제. 추천. 성공. 합격.
          </Text>
        </Sub>
        <Button>로그인</Button>
        <Text>
          확장기능 <a href="/recommend">설치</a>하기
        </Text>
      </RightContainer>
    </Container>
  );
};

export default Landing;
