import React, { useEffect, useState } from "react";
import FavoriteCard from "../FavoriteCard/FavoriteCard";
import styled from "styled-components";


const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  padding: 1rem;
  overflow: auto;
`;

const Grid = styled.div`
  width: 100%;
  height: 80%;
  padding: 0.5rem;
  overflow: auto;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  gap: 2em;
`;

const Col = styled.div<{size: number}>`
  display: flex;
  flex: ${props => props.size};
  justify-content: center;
  max-height: 40em;
`;


const FavoriteList = (props: any) => {
  const { rows } = props
  return (
    <Grid>
      {rows && rows.map((row: any) => (
        <Row
          key={row.problemId}
        >
          <FavoriteCard
            id={row.problemId}
            bojId={row.problemBojId}
            title={row.title}
            tierName={row.tierName}
            tierLevel={row.tierLevel}
          />
        </Row>
      ))}
    </Grid>
  );
};

export default FavoriteList;
