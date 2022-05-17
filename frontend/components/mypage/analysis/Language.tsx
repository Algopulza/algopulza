import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { getLanguages } from "../../../api/back/analysis/Language";
import { User } from "../../../pages/mypage";

const Container = styled.div``;

const Language = ({accessToken}:User) => {
  const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
  const [language, setLanguage] = useState<Array<string>>([]);
  const [percent, setPercent] = useState<Array<number>>([]);

  const AnalUser = async () => {
    await getLanguages(accessToken)
      .then((res) => {
        const lan = res.data.data;
        let lan_temp = [];
        let  per_temp = [];
        let idx = 0;
        for (idx; idx < lan.length; idx++) {
          lan_temp.push(lan[idx].language);
          per_temp.push(Number(lan[idx].percentage.toFixed(2)));
        }
        setLanguage(lan_temp);
        setPercent(per_temp);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    AnalUser();
  }, []);
  return (
    <Container>
      <ApexCharts
        type="donut"
        series={percent}
        height={500}
        width= {750}
        options={{
          dataLabels:{
            enabled: true,
            style:{
              fontSize:"25px"
            }
          },
          legend:{
            show:true,
            fontSize:'25px',
          },
          chart:{
            toolbar:{
              show:false
            }
          },
          plotOptions: {
            pie: {
              customScale: 0.9,
              donut: {
                size: "60%",
                labels:{
                  show: true,
                  name:{
                    fontSize: '60px',
                  },
                  value:{
                    show: true,
                    fontSize: '40px',
                    offsetY: 50
                  },
                }
              }
            },
          },
            labels: language
        }}
      />
    </Container>
  );
};

export default Language;
