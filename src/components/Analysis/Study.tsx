import ApexCharts from "react-apexcharts";
import styled from "styled-components";

const Container = styled.div`
width: 90%;
height: 90%;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0 rgba(0,0,0,0.25);
  padding: 1rem;
`

const Study = () => {
    return (
        <Container>
        <ApexCharts
          type="line"
          series= {[
              {
                  name: "Tag",
                  data: [30, 50, 90, 60, 50, 40, 0, 10, 150, 25,]
              }
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
              },
              xaxis: {
                categories: ["04/11","04/12","04/13","04/14","04/15","04/16","04/17","04/18","04/19","04/20"],
              },
            }}
        />
        </Container>
    );
};

export default Study;