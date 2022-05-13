import React from "react";
import styled from "styled-components";
import AnalyTitle from "../../common/AnalyTitle";

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

const Solved = () => {
  return (
    <Container>
      <AnalyTitle>총 푼 문제</AnalyTitle>
    </Container>
  );
};

export default Solved;
