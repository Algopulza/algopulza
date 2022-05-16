import { ReactElement, useState, useEffect } from 'react'
import Layout from '../../components/common/Layout'
import Form from '../../components/recommendation/Form'
import Subject from '../../components/recommendation/Subject'
import styled from 'styled-components'

import { useRecoilValue } from 'recoil'
import { bojIdState, accessTokenState } from '../../util/stateCollection'
import { getRecoVul } from '../../api/flask/recommend/RecoVul'
import { getRecoTag } from '../../api/flask/recommend/RecoTag'
import { getSolvedTear } from '../../api/flask/recommend/RecoSolvedTear'
import { getRecoTear } from '../../api/flask/recommend/RecoTear'

const Container = styled.section`
  padding: 0vw 5vw;
`

export default function Recommendation() {
  const [vulData, setVulData] = useState()
  const [tagData, setTagData] = useState()
  const [solvedData, setSolvedData] = useState()
  const [tearData, setTearData] = useState()
  const accessToken = useRecoilValue(accessTokenState)
  const bojId = useRecoilValue(bojIdState)

  const RecommendVul = async () => {
    await getRecoVul(accessToken, bojId)
      .then((res) => {
        // console.log(res)
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
  }, [])

  const subjects = [
    {title: '최근에 자주 해결한 태그에 속하는 문제를 추천해 드려요!', englishTitle: '', list: tagData},
    {title: '최근에 해결한 태그 중 적게 푼 태그에 속하는 문제를 추천해 드려요!', englishTitle: '', list: vulData},
    {title: '해결했던 문제 중에서 현재 티어에 맞는 문제를 추천해 드려요!', englishTitle: '', list: solvedData},
    {title: '유사 티어에 해당하는 유저가 해결한 문제를 추천해 드려요!', englishTitle: '', list: tearData}
  ]

  return (
    <>
      <Form />
      <Container>
        {subjects.map((subject) => <Subject key={subject.title} subjectAttr={subject} />)}
      </Container>
    </>
  )
}

Recommendation.getLayout = function getLayout(recommendation: ReactElement) {
  return <Layout>{recommendation}</Layout>
}
