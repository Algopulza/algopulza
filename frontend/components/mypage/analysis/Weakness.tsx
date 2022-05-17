import styled from "styled-components";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getAnalyWeek } from "../../../api/flask/analysis/AnalyWeek";
import { User } from "../../../pages/mypage";

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
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
      <ApexCharts
        type="radar"
        height={500}
        width= {750}
        series={[
          {
            name: "Tag",
            data: solved,
          },
        ]}
        options={{
          responsive:[{
            breakpoint : 1290,
            options: {
              chart:{
                width: 450,
                height: 300,
              },
              xaxis:{
                labels:{
                  show:true,
                  style:{
                   fontSize:"10px" 
                  }
                }
              },
              plotOptions: {
                radar: {
                  size: 100
                },
              },
            },   
        },
        {
          breakpoint : 780,
          options: {
            chart:{
              width: 350,
              height: 250,
            },
            xaxis:{
              labels:{
                show:false,
              }
            },
          },   
      }
      ],
          theme: {
            mode: "light",
          },
          chart: {
            type: "radar",
            background: "transparent",
            toolbar:{
              show:false
            }
          },
          stroke: {
            curve: "smooth",
            width: 2,
          },
          yaxis: {
            show: true,
            min: 0,
            tickAmount: 2,
          },
          xaxis: {
            categories: label,
            labels:{
              style:{
                fontSize:'15px',
                fontWeight:'bold'
              }
            }
          },
          plotOptions: {
            radar: {
              size: 170,
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
