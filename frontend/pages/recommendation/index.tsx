import { ReactElement, useEffect, useState } from "react";
import Layout from "../../components/common/Layout";
import Form from "../../components/recommendation/Form";
import Subject from "../../components/recommendation/Subject";
import styled from "styled-components";

import { useRecoilValue } from "recoil";
import { bojIdState, accessTokenState } from "../../util/stateCollection";
import { getRecoTear } from "../../api/flask/recommend/RecoTear";
import { getSolvedTear } from "../../api/flask/recommend/RecoSolvedTear";
import { getRecoTag } from "../../api/flask/recommend/RecoTag";
import { getRecoVul } from "../../api/flask/recommend/RecoVul";

const Container = styled.section`
  padding: 0vw 5vw;
`;

export default function Recommendation() {
  const [vulData, setVulData] = useState();
  const [tagData, setTagData] = useState();
  const [solvedData, setSolvedData] = useState();
  const [tearData, setTearData] = useState();
  const accessToken = useRecoilValue(accessTokenState);
  const bojId = useRecoilValue(bojIdState);

  const RecommendVul = async () => {
    await getRecoVul(accessToken, bojId)
      .then((res) => {
        const list = res.data.slice(0, 5);
        setVulData(list);
      })
      .catch((err) => console.log(err));
  };

  const RecommendTag = async () => {
    await getRecoTag(accessToken, bojId)
      .then((res) => {
        const list = res.data.slice(0, 5);
        setTagData(list);
      })
      .catch((err) => console.log(err));
  };

  const RecommendSolved = async () => {
    await getSolvedTear(accessToken, bojId)
      .then((res) => {
        const list = res.data.slice(0, 5);
        setSolvedData(list);
      })
      .catch((err) => console.log(err));
  };

  const RecommendTear = async () => {
    await getRecoTear(accessToken, bojId)
      .then((res) => {
        const list = res.data.slice(0, 5);
        setTearData(list);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    RecommendVul();
    RecommendTag();
    RecommendSolved();
    RecommendTear();
  }, []);

  const titles = [
    {title: "최근 자주 풀었던 태그들에 속하는 문제들을 추천해 드려요!", englishTitle: "", list: tagData},
    {title: "최근 푼 문제 중 적게 푼 태그에서 문제들을 추천해 드려요!", englishTitle: "", list: vulData},
    {title: "이미 푼 문제 중 티어에 맞게 문제들을 추천해 드려요!", englishTitle: "", list: solvedData},
    {title: "유사한 티어의 유저와 비슷한 문제들을 추천해 드려요!", englishTitle: "", list: tearData}
  ];

  return (
    <>
      <Form />
      <Container>
        {vulData ? (
          <>
            {titles.map((title) => ( <Subject key={title.title} sub_title={title} /> ))}
          </>
        ) : (
          <div>기존에 푼 문제들을 상단에 제공해주세요!</div>
        )}
      </Container>
    </>
  );
}

Recommendation.getLayout = function getLayout(recommendation: ReactElement) {
  return <Layout>{recommendation}</Layout>;
};