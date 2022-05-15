import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import AnalyTitle from "../../common/AnalyTitle";
import { getLanguages } from "../../../api/back/analysis/Language";
import { User } from "../../../pages/mypage";

const Container = styled.div`
  width: 30vw;
  height: 60vh;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  padding: 1rem;
`;

const Language = ({accessToken}:User) => {
  const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
  const [language, setLanguage] = useState<Array<string>>([]);
  const [percent, setPercent] = useState<Array<number>>([]);

  const AnalUser = async () => {
    await getLanguages(accessToken)
      .then((res) => {
        const lan = res.data.data;
        let lan_temp = [];
        let  per_temp = [];
        let idx = 0;
        for (idx; idx < lan.length; idx++) {
          lan_temp.push(lan[idx].language);
          per_temp.push(lan[idx].percentage);
        }
        setLanguage(lan_temp);
        setPercent(per_temp);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    AnalUser();
  }, []);
  return (
    <Container>
      <AnalyTitle>사용언어 비율</AnalyTitle>
      <ApexCharts
        type="donut"
        series={percent}
        options={{
          plotOptions: {
            pie: {
              customScale: 0.8
            }
          },
            labels: language
        }}
      />
    </Container>
  );
};

export default Language;
