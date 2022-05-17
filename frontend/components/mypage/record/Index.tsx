import React from "react";
import styled from "styled-components";
import Favorite from "./Favorite";
import Solved from "./Solved";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2em;
`;

const Grid = styled.div``;

const Index = () => {
  return (
    <Container>
      <Grid>
        <Favorite />
      </Grid>
      <Grid>
        <Solved />
      </Grid>
    </Container>
  );
};

export default Index;
