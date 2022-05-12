import React from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import AnalyTitle from "../../common/AnalyTitle";

const Container = styled.div`
  width: 90%;
  height: 90%;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Month = () => {
  const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
  return (
    <Container>
      <AnalyTitle>월 별 문제 풀이 갯수</AnalyTitle>
      <ApexCharts
        type="bar"
        series={[
          {
            name: "Tag",
            data: [15, 18, 22, 21, 24, 16, 10, 11, 16, 20],
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
            categories: [
              "deque",
              "hashing",
              "trees",
              "bitmask",
              "divide_and_conquer",
              "euclidean",
              "arbitrary_precision",
              "pythagoras",
              "geometry",
              "combinatorics",
            ],
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
};

export default Month;
