import styled from "styled-components";
import dynamic from "next/dynamic";
import AnalyTitle from "../../common/AnalyTitle";
import { useEffect, useState } from "react";
import { User } from "../../../pages/mypage";
import { getAnalyTag } from "../../../api/flask/analysis/AnalyTag";

const Container = styled.div`
  width: 30vw;
  height: 60vh;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  padding: 1rem;
`;

export default function Solved({accessToken, bojId}:User) {
  const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
  const [label, setLabel] = useState<Array<string>>([]);
  const [solved, setSolved] = useState<Array<number>>([]);

  const AnalUser = async () => {
    await getAnalyTag(accessToken, bojId)
      .then((res) => {
        const week = res.data;
        let label_temp = [];
        let solved_temp = [];
        let idx = 0;
        for (idx; idx < week.length; idx++) {
          label_temp.push(week[idx].name);
          solved_temp.push(week[idx].solvedcnt);
        }
        setLabel(label_temp);
        setSolved(solved_temp);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    AnalUser();
  }, []);
  return (
    <Container>
      <AnalyTitle>태그 별 해결 문제 수</AnalyTitle>
      <ApexCharts
        type="bar"
        series={[
          {
            name: "Tag",
            data: solved,
          },
        ]}
        options={{
          theme: {
            mode: "light",
          },
          chart: {
            background: "transparent",
          },
          stroke: {
            curve: "smooth",
            width: 2,
          },
          yaxis: {
            show: true,
            labels: {},
          },
          xaxis: {
            categories: label,
            labels: {},
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            },
          },
        }}
      />
    </Container>
  );
}
