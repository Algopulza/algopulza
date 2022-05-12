import React from "react";
import styled from "styled-components";
import Weakness from "./Weakness";
import Tag from "./Tag";
import Language from "./Language";
import Month from "./Month";
import Solved from "./Solved";
import Code from "./Code";

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const TopContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const BottomContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
`;

const BottomRight = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const Index = () => {
  return (
    <Container>
      <TopContainer>
        <Weakness />
        <Tag />
        <Language />
      </TopContainer>

      <BottomContainer>
        <Month />
        <BottomRight>
          <Solved />
          <Code />
        </BottomRight>
      </BottomContainer>
    </Container>
  );
};

export default Index;
