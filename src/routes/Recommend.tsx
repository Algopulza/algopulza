import React from 'react';
import styled from "styled-components";
import RecommendCarousel from "components/Recommend/RecommendCarousel"
import Card from "components/Common/Card"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const SubContainer = styled.div`
  padding: 0 3vw;
  margin-top: 1rem;
`

const Title = styled.div`
  font-size: 2rem;
  margin-top: 2rem;
`

const Recommend = () => {
    return (
        <Container>
        <RecommendCarousel />
      <SubContainer>
      <Title>취약한 태그에 속하는 문제들을 추천해 드려요!</Title>
      <Card />
      <Title>취약한 태그에 속하는 문제들을 추천해 드려요!</Title>
      <Card />
      <Title>취약한 태그에 속하는 문제들을 추천해 드려요!</Title>
      <Card />
      <Title>취약한 태그에 속하는 문제들을 추천해 드려요!</Title>
      <Card />
      <Title>취약한 태그에 속하는 문제들을 추천해 드려요!</Title>
      <Card />
      </SubContainer>
        </Container>
    );
};

export default Recommend;