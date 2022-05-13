import styled from "styled-components";
import dynamic from "next/dynamic";
import AnalyTitle from "../../common/AnalyTitle";
import { useEffect, useState } from "react";
import { getAnalyWeek } from "../../../api/flask/analysis/AnalyWeek";
import { User } from "../../../pages/mypage";

const Container = styled.div`
  width: 30vw;
  height: 60vh;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  padding: 1rem;
`;

export default function Weakness({accessToken, bojId}:User) {
  const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
  const [label, setLabel] = useState<Array<string>>([]);
  const [solved, setSolved] = useState<Array<number>>([]);

  const AnalUser = async () => {
    await getAnalyWeek(accessToken, bojId)
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
      <AnalyTitle>취약점</AnalyTitle>
      <ApexCharts
        type="radar"
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
            type: "radar",
            height: "200%",
            background: "transparent",
          },
          stroke: {
            curve: "smooth",
            width: 2,
          },
          yaxis: {
            show: true,
            min: 0,
            max: 2,
            tickAmount: 2,
          },
          xaxis: {
            categories: label,
          },
          plotOptions: {
            radar: {
              size: 100,
              offsetX: 0,
              offsetY: 0,
              polygons: {
                strokeColors: "#e8e8e8",
                connectorColors: "#e8e8e8",
                fill: {
                  colors: undefined,
                },
              },
            },
          },
        }}
      />
    </Container>
  );
}
