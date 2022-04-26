import ApexCharts from "react-apexcharts";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  height: 90%;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  padding: 1rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  padding: 1rem;
`;

const Solved = () => {
  return (
    <Container>
      <Title>태그 별 해결 문제 수</Title>
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

export default Solved;