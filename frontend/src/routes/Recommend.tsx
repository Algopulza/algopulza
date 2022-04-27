import RecommendCarousel from "components/Recommend/RecommendCarousel";
import Card from "components/Common/Card";
import styled from "styled-components";
import { getRecommend } from "api/recommend";
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubContainer = styled.div`
  margin-bottom: 16px;
  padding: 0 3vw;
`;

const Title = styled.div`
  margin-bottom: 32px;
  font-size: 1.6vw;
`;

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 96px;
`;

// 반복되는 Card Tag에 대한 refactoring이 필요함
const Recommend = () => {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    getRecommend()
      .then((res) => {
        console.log(res);
        console.log(res.data.slice(0,5));
        setData(res.data.slice(0,5));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <RecommendCarousel />

      <SubContainer>
        <Title>취약한 태그에 속하는 문제들을 추천해 드려요!</Title>
        <Cards>
          {data &&
            data.map((item: any) => (
              <Card
                key={item.problemId}
                tags={item.tags}
                id={item.problemId}
                title={item.titleKo}
                level={item.level}
                average={item.averageTries}
                accept={item.acceptedUserCount}
              />
            ))}
        </Cards>

        <Title>최근 자주 풀었던 태그에 속하는 문제들을 추천해 드려요!</Title>
        <Cards>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </Cards>

        <Title>
          코딩 테스트에 자주 출제되는 태그에 속하는 문제들을 추천해 드려요!
        </Title>
        <Cards>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </Cards>

        <Title>
          비슷한 실력의 다른 유저들이 많이 푼 문제들을 추천해 드려요!
        </Title>
        <Cards>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </Cards>
      </SubContainer>
    </Container>
  );
};

export default Recommend;