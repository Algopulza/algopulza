import { ReactElement, useEffect, useState } from 'react'
import Layout from '../../components/common/Layout'
import Form from '../../components/recommendation/Form'
import Subject from '../../components/recommendation/Subject'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.section`
  padding: 0vw 5vw;
`

export async function getVul() {
  const res = await axios.get("https://k6a4081.p.ssafy.io/recomm/vulnerability/dw3624")
  // console.log(res)
  const posts =res.data
  return{
    props:{
      posts
    }
  }
}

export async function getTag() {
  const res = await axios.get("https://k6a4081.p.ssafy.io/recomm/freq-tag/dw3624")
  // console.log(res)
  const posts =res.data
  return{
    props:{
      posts
    }
  }
}

export async function getSolved() {
  const res = await axios.get("https://k6a4081.p.ssafy.io/random-solved/dw3624")
  // console.log(res)
  const posts =res.data
  return{
    props:{
      posts
    }
  }
}

export default function Recommendation() {
  const [vulData, setVulData] = useState()
  const [tagData, setTagData] = useState()
  const [solvedData, setSolvedData] = useState()

  const RecommendVul = async () => {
    await getVul()
      .then((res) => {
        const list = res.props.posts.slice(0,5)
        // console.log(list)
        setVulData(list)
      })
      .catch((err) => console.log(err))
  }

  const RecommendTag = async () => {
    await getTag()
      .then((res) => {
        const list = res.props.posts.slice(0,5)
        // console.log(list)
        setTagData(list)
      })
      .catch((err) => console.log(err))
  }

  const RecommendSolved = async () => {
    await getSolved()
      .then((res) => {
        const list = res.props.posts.slice(0,5)
        // console.log(list)
        setSolvedData(list)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    RecommendVul()
    RecommendTag()
    RecommendSolved()
  }, [])

  const titles = [
    { title: '최근 자주 풀었던 태그들에 속하는 문제들을 추천해 드려요!', englishTitle: "", list:tagData },
    { title: '최근 푼 문제 중 적게 푼 태그에서 문제들을 추천해 드려요!', englishTitle: "", list:vulData },
    { title: '이미 푼 문제 중 티어에 맞게 문제들을 추천해 드려요!', englishTitle: "", list:solvedData },
  ]

  return (
    <>
      <Form />

      <Container>
        {titles.map(title => <Subject key={title.title} sub_title={title} />)}
      </Container>
    </>
  )
}

Recommendation.getLayout = function getLayout(recommendation: ReactElement) {
  return (
    <Layout>{recommendation}</Layout>
  )
}
