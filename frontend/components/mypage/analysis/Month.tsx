import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import AnalyTitle from "../../common/AnalyTitle";
import { getSolved } from "../../../api/back/analysis/Solved";
import { User } from "../../../pages/mypage";

const Container = styled.div`
  width: 61.5vw;
  height: 100vh;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  padding: 1rem;
`;

const Month = ({accessToken}:User) => {
  const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
  const [year, setYear] = useState<Array<string>>([]);
  const [solved, setSolved] = useState<Array<number>>([]);

  const series : any[] = []
  const AnalUser = async () => {
    await getSolved(accessToken)
      .then((res) => {
        const year = res.data.data;
        console.log(year)
        let year_temp = [];
        let solved_temp = [];
        let idx = 0;
        for (idx; idx < year.length; idx++) {
          year_temp.push(year[idx].year);
          solved_temp.push(year[idx].solvedCount);
          series.push({
            name: year_temp,
            data: solved_temp
          })
        }
        setYear(year_temp);
        setSolved(solved_temp);
      })
      .catch((err) => console.log(err));
  };

  console.log(year)
  console.log(solved)
  console.log(series)

  useEffect(() => {
    AnalUser();
  }, []);
  return (
    <Container>
      <AnalyTitle>월 별 문제 풀이 갯수</AnalyTitle>
      <ApexCharts
        type="line"
        series={series}
        options={{
          chart: {
            height: 350,
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
          grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          markers: {
            size: 1
          },
          xaxis: {
            categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
          },
          yaxis: {
            min: 5,
            max: 40
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
          }
        }}
      />
    </Container>
  );
};

export default Month;
