import { useState } from "react";
import styled from "styled-components";
import Red from "assets/img/red.png";
import Blue from "assets/img/blue.png";
import Card from "components/Common/Card";

const Container = styled.div`
  background-color: #ffc94d;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  height: 23rem;
`;

const Text1 = styled.div`
  font-size: 1rem;
`;

const Text2 = styled.div`
  margin-top: 1rem;
  font-size: 2rem;
`;

const Present = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 3rem;
  margin-top: 3rem;
`;

const SubPresent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.img`
  width: 14rem;
  cursor: pointer;
`;

const Button = styled.button`
  color: black;
  background-color: white;
  padding: 0.5rem 1rem;
  border-radius: 5rem;
  margin-top: 2rem;
  font-weight: 600;
  font-size: 1rem;
  font-family: GmarketSansMedium;
  border: none;
  cursor: pointer;
`;

const Banner = () => {
  const [visibleBlue, setVisibleBlue] = useState(false);
  const [visibleRed, setVisibleRed] = useState(false);
  return (
    <Container>
      <Text1>문제를 고르는 것마저 귀찮은 당신을 위한 선물!</Text1>
      <Text2>하루 한 문제 습관 들이기!!</Text2>
      <Present>
        <SubPresent>
          {visibleBlue ? <Card /> : <Img src={Blue} alt="blue" />}
          <Button onClick={() => {setVisibleBlue(true);}}>수준을 고려해서 추천 받아보고 싶다면</Button>
        </SubPresent>
        <SubPresent>
          {visibleRed ? <Card /> : <Img src={Red} alt="red" />}
          <Button onClick={() => {setVisibleRed(true);}}>수준을 고려해서 추천 받아보고 싶다면</Button>
        </SubPresent>
      </Present>
    </Container>
  );
};

export default Banner;