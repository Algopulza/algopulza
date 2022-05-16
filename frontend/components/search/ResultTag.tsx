import React from 'react';
import styled from "styled-components";

const Grid = styled.div`
  
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 0.5em;
`;

const Tag = styled.span`
  color: #c4c4c4;
`;

const ResultTag = (props: any) => {
  const {tagList} = props
  return (
    <Row>
      {tagList && tagList.map((tag: any) => (
        <Tag key={tag.name}>#{tag.name}</Tag>
        ))}
    </Row>
  );
};

export default ResultTag;