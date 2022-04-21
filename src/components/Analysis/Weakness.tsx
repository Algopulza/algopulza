import ApexCharts from "react-apexcharts";
import styled from "styled-components";

const Container = styled.div`
width: 90%;
height: 90%;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0 rgba(0,0,0,0.25);
  padding: 1rem;
`

const Title = styled.div`
    font-size: 1.5rem;
    padding: 1rem;
    margin-bottom: 3rem;
`

const Weakness = () => {
    return (
        <Container>
            <Title>취약점</Title>
          <ApexCharts
            type="radar"
            series= {[
                {
                    name: "Tag",
                    data: [3,5,9,6,5,4]
                }
            ]}
            options={{
                theme: {
                  mode: "light",
                },
                chart: {
                  type: "radar",
                  height: '200%',
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
                  categories: ["DFS","BFS","DP","math","greedy","graphs"],
                },
                plotOptions: {
                    radar: {
                      size: 160,
                      offsetX: 0,
                      offsetY: 5,
                      polygons: {
                        strokeColors: '#e8e8e8',
                        connectorColors: '#e8e8e8',
                        fill: {
                          colors: undefined
                        }
                      }
                    }
                  }
              }}
          />
        </Container>
    );
};

export default Weakness;