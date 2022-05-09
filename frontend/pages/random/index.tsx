import { ReactElement } from 'react'
import Layout from '../../components/common/Layout'
import Gift from '../../components/random/Gift'
import Subject from '../../components/recommendation/Subject'
import styled from 'styled-components'

const Container = styled.section`
  padding: 0vw 5vw;
`

export type Title = { title: string, englishTitle: string, }
const titles = [
  { title: "구현", englishTitle: "Implementation" },
  { title: "다이내믹 프로그래밍", englishTitle: "Dynamic Programming" },
  { title: "그래프", englishTitle: "Graph" },
  { title: "그리디", englishTitle: "Greedy" },
  { title: "정렬", englishTitle: "Sorting" },
  { title: "너비 우선 탐색", englishTitle: "BFS" },
  { title: "깊이 우선 탐색", englishTitle: "DFS" },
  { title: "조합론", englishTitle: "Combinatorics" }
]

export default function Random() {
  return (
    <>
      <Gift />

      <Container>
        {titles.map(title => <Subject key={title.title} title={title} />)}
      </Container>
    </>
  )
}

Random.getLayout = function getLayout(random: ReactElement) {
  return (
    <Layout>{random}</Layout>
  )
}
