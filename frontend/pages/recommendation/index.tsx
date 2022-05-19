import { ReactElement, useState, useEffect } from "react"
import Layout from "../../components/common/Layout"
import Gift from "../../components/random/Gift"
import Subject from "../../components/recommendation/Subject"
import styled from "styled-components"
import { useRecoilValue } from "recoil"
import { bojIdState, accessTokenState, algoIdState } from "../../util/stateCollection"
import { getRecoVul } from "../../api/flask/recommend/RecoVul"
import { getRecoTag } from "../../api/flask/recommend/RecoTag"
import { getSolvedTear } from "../../api/flask/recommend/RecoSolvedTear"
import { getRecoTear } from "../../api/flask/recommend/RecoTear"
import { CircularProgress } from "@mui/material"
import ButtonFloating from "../../components/common/button/ButtonFloating"
import { GetServerSideProps } from "next"

const Container = styled.section`
  padding: 0vh 5vw;
`

const CircularProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40vh;
`

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Recommendation() {
  const [alert, setAlert] = useState(true)
  const [vulData, setVulData] = useState()
  const [tagData, setTagData] = useState()
  const [solvedData, setSolvedData] = useState()
  const [tearData, setTearData] = useState()
  const [cnt, setCnt] = useState(0)
  const accessToken = useRecoilValue(accessTokenState)
  const bojId = useRecoilValue(bojIdState)
  const algoId = useRecoilValue(algoIdState)

  const RecommendVul = async () => {
    await getRecoVul(accessToken, bojId).then((res) => {
      setCnt((pre) => pre + 1)
      const list = res.data.slice(0, 5)
      setVulData(list)
    })
  }

  const RecommendTag = async () => {
    await getRecoTag(accessToken, bojId).then((res) => {
      setCnt((pre) => pre + 1)
      const list = res.data.slice(0, 5)
      setTagData(list)
    })
  }

  const RecommendSolved = async () => {
    await getSolvedTear(accessToken, bojId).then((res) => {
      setCnt((pre) => pre + 1)
      const list = res.data.slice(0, 5)
      setSolvedData(list)
    })
  }

  const RecommendTear = async () => {
    await getRecoTear(accessToken, bojId).then((res) => {
      setCnt((pre) => pre + 1)
      const list = res.data.slice(0, 5)
      setTearData(list)
    })
  }

  useEffect(() => {
    RecommendVul()
    RecommendTag()
    RecommendSolved()
    RecommendTear()
  }, [])

  useEffect(() => {
    if (cnt >= 4) setAlert(false)
  }, [cnt])

  const subjects = [
    {
      title: `# ${algoId}님이 많이 푼 문제 유형 🧐`,
      englishTitle: "",
      list: tagData,
    },
    {
      title: `# ${algoId}님이 적게 푼 문제 유형 🧐`,
      englishTitle: "",
      list: vulData,
    },
    {
      title: `# ${algoId}님이 풀었던 문제 🧐`,
      englishTitle: "",
      list: solvedData,
    },
    {
      title: `# 다른 유저가 많이 푼 문제 유형 🧐`,
      englishTitle: "",
      list: tearData,
    },
  ]

  return (
    <>
      {alert ? (
        <CircularProgressContainer>
          <SubContainer>
            <CircularProgress
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "1rem",
                color: "#282828",
              }}
            />
            <div>사용자에게 맞는 추천 문제를 뽑아오고 있어요!</div>
          </SubContainer>
          <ButtonFloating />
        </CircularProgressContainer>
      ) : (
        <>
          <Gift />
          <Container>
            {subjects.map((subject) => (
              <Subject key={subject.title} subjectAttr={subject} />
            ))}
          </Container>
          <ButtonFloating />
        </>
      )}
    </>
  )
}

Recommendation.getLayout = function getLayout(recommendation: ReactElement) {
  return <Layout>{recommendation}</Layout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context
  const token = req.cookies.accessToken

  if (!token) {
    return {
      redirect: {
        destination: "/",
        statusCode: 302,
      },
    }
  }

  return {
    props: {},
  }
}