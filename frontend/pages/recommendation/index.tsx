import { ReactElement } from 'react'
import Layout from '../../components/common/Layout'
import Carousel from '../../components/recommendation/Carousel'
import Subject from '../../components/recommendation/Subject'
import styled from 'styled-components'

const Container = styled.section`
  padding: 0vw 3vw;
`

export type Title = { name: string }
const titles = [
  { name: '취약한 태그에 속하는 문제들을 추천해 드려요!' },
  { name: '최근 자주 풀었던 태그에 속하는 문제들을 추천해 드려요!' },
  { name: '코딩 테스트에 자주 출제되는 태그에 속하는 문제들을 추천해 드려요!' },
  { name: '비슷한 실력의 다른 유저들이 많이 푼 문제들을 추천해 드려요!' },
]

export default function Recommendation() {
  return (
    <>
      <Carousel />

      <Container>
        {titles.map(title => <Subject key={title.name} title={title} />)}
      </Container>
    </>
  )
}

Recommendation.getLayout = function getLayout(recommendation: ReactElement) {
  return (
    <Layout>{recommendation}</Layout>
  )
}
