import styled from "styled-components";
import dynamic from "next/dynamic";
import { getBadgeImage } from "../../../util/BadgeImage";


const Container = styled.div`
  width: 30vw;
  height: 23vh;
  background: #FFFFFF;
  box-shadow: 0px 2px 10px 5px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  display: grid;
  grid-template-columns: 2fr 2fr;
  padding: 1rem;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  `;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  /* font-size: 2rem; */
  margin-left: 1rem;
`;

type EXP = {exp : number}

export default function Badge({exp}:EXP) {
  const badge = getBadgeImage(exp).image
  const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
  const data=getBadgeImage(exp).per
  const grade=getBadgeImage(exp).grade
  return (
    <Container>
      <ApexCharts
        type="radialBar"
        series={data}
        options={{
          chart: {
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 0,
                size: '70%',
                image: badge,
                imageWidth: 64,
                imageHeight: 64,
                imageClipped: false
              },
              dataLabels: {
                name: {
                  show: false,
                  color: '#fff'
                },
                value: {
                  show: true,
                  color: '#333',
                  offsetY: 50,
                  fontSize: '22px'
                }
              }
            }
          },
        }}
      />
      <RightContainer>
          <Title>현재 {exp}P</Title>
          <Title>현재 {grade} 등급이에요!</Title>
      </RightContainer>
    </Container>
  );
}