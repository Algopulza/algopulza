import styled from "styled-components"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { User } from "../../../pages/mypage"
import { getAnalyTag } from "../../../api/flask/analysis/AnalyTag"

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function Solved({ accessToken, bojId }: User) {
  const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false })
  const [label, setLabel] = useState<Array<string>>([])
  const [solved, setSolved] = useState<Array<number>>([])

  const AnalUser = async () => {
    await getAnalyTag(accessToken, bojId)
      .then((res) => {
        const week = res.data
        let label_temp = []
        let solved_temp = []
        let idx = 0
        for (idx; idx < week.length; idx++) {
          label_temp.push(week[idx].name)
          solved_temp.push(week[idx].solvedcnt)
        }
        setLabel(label_temp)
        setSolved(solved_temp)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    AnalUser()
  }, [])

  return (
    <Container>
      <ApexCharts
        type="bar"
        height={500}
        width={750}
        series={[
          {
            name: "Tag",
            data: solved,
          },
        ]}
        options={{
          responsive: [
            {
              breakpoint: 1290,
              options: {
                chart: {
                  width: 450,
                  height: 300,
                },
                xaxis: {
                  labels: {
                    style: {
                      fontSize: "10px",
                    },
                  },
                },
              },
            },
            {
              breakpoint: 780,
              options: {
                chart: {
                  width: 350,
                  height: 250,
                },
              },
            },
          ],
          theme: {
            mode: "light",
          },
          chart: {
            background: "transparent",
            toolbar: {
              show: false,
            },
          },
          stroke: {
            curve: "smooth",
            width: 2,
          },
          xaxis: {
            categories: label,
            labels: {
              style: {
                fontSize: "15px",
                fontWeight: "bold",
              },
            },
          },
          yaxis: {
            labels: {
              offsetX: -10,
            },
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: false,
            },
          },
        }}
      />
    </Container>
  )
}