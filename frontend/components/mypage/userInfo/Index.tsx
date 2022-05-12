import React from "react";
import styled from "styled-components";
import Userinfo from "./Userinfo";
import Badge from "./Badge";
import Timer from "./Timer";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Index = () => {
  return (
    <Container>
      <Userinfo />
      <Badge />
      <Timer />
    </Container>
  );
};

export default Index;
