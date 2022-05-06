import { ReactElement, useState } from 'react'
import Layout from '../../components/common/Layout'
import Form from '../../components/recommendation/Form'
import Subject from '../../components/recommendation/Subject'
import styled from 'styled-components'

const Container = styled.section`
  padding: 0vw 5vw;
`

export type Title = { title: string, englishTitle: string}
// const titles = [
//   { title: '취약한 태그에 속하는 문제들을 추천해 드려요!', englishTitle: "", list:<A[] },
//   { title: '최근 자주 풀었던 태그들에 속하는 문제들을 추천해 드려요!', englishTitle: "", list:undefined },
//   { title: '비슷한 실력의 다른 유저들이 많이 푼 문제들을 추천해 드려요!', englishTitle: "", lsit:undefined },
// ]


export default function Recommendation() {

  
  const [data, setData] = useState(
    {
      simulationList : [],
  }
  )
  
  const RandomSub = async () => {
};

const titles = [
  { title: '취약한 태그에 속하는 문제들을 추천해 드려요!', englishTitle: "", list:data.simulationList },
  { title: '최근 자주 풀었던 태그들에 속하는 문제들을 추천해 드려요!', englishTitle: "", list:data.simulationList },
  { title: '비슷한 실력의 다른 유저들이 많이 푼 문제들을 추천해 드려요!', englishTitle: "", lsit:data.simulationList },
]

  return (
    <>
      <Form />

      <Container>
        {/* {titles.map(title => <Subject key={title.title} sub_title={title} />)} */}
      </Container>
    </>
  )
}

Recommendation.getLayout = function getLayout(recommendation: ReactElement) {
  return (
    <Layout>{recommendation}</Layout>
  )
}
