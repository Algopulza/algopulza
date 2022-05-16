import React from "react";
import styled from "styled-components";
import AnalyTitle from "../../common/AnalyTitle";

const Container = styled.div`
  width: 30vw;
  height: 33vh;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  font-size: 1.5rem;
`;

type CODE = {
  time:number
}
const Time = ({time}:CODE) => {
  return (
    <Container>
      <AnalyTitle>총 걸린 시간</AnalyTitle>
      {time} 분
    </Container>
  );
};

export default Time;
