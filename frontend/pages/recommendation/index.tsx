import { ReactElement, useState, useEffect } from 'react'
import Layout from '../../components/common/Layout'
import Gift from '../../components/random/Gift'
import Subject from '../../components/recommendation/Subject'
import styled from 'styled-components'

import { useRecoilValue } from 'recoil'
import { bojIdState, accessTokenState } from '../../util/stateCollection'
import { getRecoVul } from '../../api/flask/recommend/RecoVul'
import { getRecoTag } from '../../api/flask/recommend/RecoTag'
import { getSolvedTear } from '../../api/flask/recommend/RecoSolvedTear'
import { getRecoTear } from '../../api/flask/recommend/RecoTear'
import { CircularProgress } from "@mui/material";

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
  const [alert, setAlert ] = useState(true)
  const [vulData, setVulData] = useState()
  const [tagData, setTagData] = useState()
  const [solvedData, setSolvedData] = useState()
  const [tearData, setTearData] = useState()
  const accessToken = useRecoilValue(accessTokenState)
  const bojId = useRecoilValue(bojIdState)

  const RecommendVul = async () => {
    await getRecoVul(accessToken, bojId)
      .then((res) => {
        const list = res.data.slice(0, 5)
        setVulData(list)
      })
  }

  const RecommendTag = async () => {
    await getRecoTag(accessToken, bojId)
      .then((res) => {
        const list = res.data.slice(0, 5)
        setTagData(list)
      })
  }

  const RecommendSolved = async () => {
    await getSolvedTear(accessToken, bojId)
      .then((res) => {
        const list = res.data.slice(0, 5)
        setSolvedData(list)
      })
  }

  const RecommendTear = async () => {
    await getRecoTear(accessToken, bojId)
      .then((res) => {
        const list = res.data.slice(0, 5)
        setTearData(list)
      })
  }

  useEffect(() => {
    RecommendVul()
    RecommendTag()
    RecommendSolved()
    RecommendTear()
    console.log(1)
  }, [])

  useEffect(() =>{
    setTimeout(() => {setAlert(false)},2000)
  },[])

  const subjects = [
    {title: '최근에 자주 해결한 태그에 속하는 문제를 추천해 드려요!', englishTitle: '', list: tagData},
    {title: '최근에 해결한 태그 중 적게 푼 태그에 속하는 문제를 추천해 드려요!', englishTitle: '', list: vulData},
    {title: '해결했던 문제 중에서 현재 티어에 맞는 문제를 추천해 드려요!', englishTitle: '', list: solvedData},
    {title: '유사 티어에 해당하는 유저가 해결한 문제를 추천해 드려요!', englishTitle: '', list: tearData}
  ]

  return (
    <>
      {alert?
        <CircularProgressContainer>
          <SubContainer>
            <CircularProgress sx={{ display: 'flex', justifyContent: 'center', marginBottom:"1rem" , color: '#282828' }}/>
            <div>사용자에게 맞는 추천 문제를 뽑아오고 있어요!</div>
          </SubContainer>
        </CircularProgressContainer>
        :
        <>
      <Gift />
      <Container>
        {subjects.map((subject) => <Subject key={subject.title} subjectAttr={subject} />)}
      </Container>
      </>
      }
    </>
  )
}

Recommendation.getLayout = function getLayout(recommendation: ReactElement) {
  return <Layout>{recommendation}</Layout>
}
