import React from "react";
import FavoriteCard from "../FavoriteCard/FavoriteCard";
import styled from "styled-components";

const Grid = styled.div`
  width: 100%;
  height: 80%;
  padding: 0.5rem;
  overflow-y: auto;
  margin-bottom: 30px;
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
