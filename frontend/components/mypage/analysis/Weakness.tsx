import styled from "styled-components"
import { useEffect, useState } from "react"
import { getAnalyWeak } from "../../../api/back/analysis/AnalyWeek"
import { User } from "../../../pages/mypage"
import ReactWordcloud from "react-wordcloud"
import "tippy.js/dist/tippy.css"
import "tippy.js/animations/scale.css"

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function Weakness({ accessToken }: User) {
  const [word, setWord] = useState<Array<any>>([])
  const count = 55
  const AnalUser = async () => {
    await getAnalyWeak(accessToken, count)
      .then((res) => {
        const year = res.data.data
        let idx = 0
        const temp = []
        for (idx; idx < year.length; idx++) {
          temp.push({
            text: year[idx].text,
            value: year[idx].value,
          })
        }
        setWord(temp)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    AnalUser()
  }, [])

  const words = word

  return (
    <Container>
      <div style={{ width: "100%", height: "100%" }}>
        <ReactWordcloud
          words={words}
          options={{
            rotations: 1,
            rotationAngles: [0, 0],
            fontSizes: [10, 60],
            enableTooltip: false,
          }}
          minSize={[0, 460]}
        />
      </div>
    </Container>
  )
}