import styled from "styled-components";
import dynamic from "next/dynamic";
import { getBadgeImage } from "../../../util/BadgeImage";
import AnalyCard from "../../common/card/AnalyCard";
import Image from "next/image";

const Temp = styled.div`
  width:10vw;
  height:10vh;
`

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width:4vw;
  margin-left: auto;
  `;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-left: 0.1rem;
  font-size: 0.8rem;
`;

type EXP = {exp : number}

export default function Badge({exp}:EXP) {
  const badge = getBadgeImage(exp).image
  const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
  const data=getBadgeImage(exp).per
  const grade=getBadgeImage(exp).grade
  return (
    <AnalyCard dp="grid" gtc="1fr 1fr">
        <RightContainer>
        <Image src={badge} width={25} height={50} alt="뱃지 사진이 이상해요" />
          <Title>{exp} XP</Title>
      </RightContainer>
      <Temp>
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
                size: '50',
              },
              dataLabels: {
                name: {
                  show: false,
                  color: '#fff'
                },
                value: {
                  show: true,
                  color: '#333',
                  fontSize: '0.7rem'
                }
              }
            }
          },
        }}
      />
      </Temp>

    </AnalyCard>
  );
}