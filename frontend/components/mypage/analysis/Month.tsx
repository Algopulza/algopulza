import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { getSolved } from "../../../api/back/analysis/Solved";
import { User } from "../../../pages/mypage";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Month = ({accessToken}:User) => {
  const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
  const [series, setSeries] = useState<Array<any>>([]);

  const AnalUser = async () => {
    await getSolved(accessToken)
      .then((res) => {
        const year = res.data.data;
        let idx = 0;
        const temp = []
        for (idx; idx < year.length; idx++) {
          temp.push({
            name: year[idx].year,
            data: year[idx].solvedCount
          })
        }
        setSeries(temp);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    AnalUser();
  }, []);
  return (
    <Container>
      <ApexCharts
        type="line"
        series={series}
        height={450}
        width= {750}
        options={{
          responsive:[{
            breakpoint : 1290,
            options: {
              chart:{
                width: 450,
                height: 300,
              },
              xaxis: {
                 labels:{
                  style:{
                    fontSize:"10px",
                    fontWeight:"bold"
                  }
                }
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
          },   
      }
      ],
          chart: {
            type: 'line',
            dropShadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2
            },
            toolbar: {
              show: false
            }
          },
          colors: ['#77B6EA', '#545454'],
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'smooth'
          },
          markers: {
            size: 1
          },
          xaxis: {
            categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            labels:{
              style:{
                fontSize:"15px",
                fontWeight:"bold"
              }
            }
          },
          yaxis: {
            labels:{
              offsetX: -10,
            }
          },
        }}
      />
    </Container>
  );
};

export default Month;