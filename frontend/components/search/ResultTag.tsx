import React from 'react';
import styled from "styled-components";

const TextRow = styled.div`
  display: block;
  width: 20em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  float: 'left';
`;

const Tag = styled.span`
  font-size: 0.8em;
  color: #282828;
`;

const ResultTag = (props: any) => {
  const {tagList} = props
  return (
    <TextRow>
      {tagList && tagList.map((tag: any) => (
        <Tag key={tag.name}># {tag.name}  </Tag>
        ))}
    </TextRow>
  );
};

export default ResultTag;