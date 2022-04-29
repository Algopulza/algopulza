import { ReactElement } from 'react'
import Layout from '../../components/common/Layout'
import Gift from '../../components/random/Gift'
import Subject from '../../components/recommendation/Subject'
import styled from 'styled-components'

const Container = styled.section`
  padding: 0vw 3vw;
`

export type Title = { name: string }
const titles = [
  { name: '구현(Implementation)'},
  { name: '다이나믹 프로그래밍(DP)'},
  { name: '그래프 이론(Graphs)'},
  { name: '그리디 알고리즘(Greedy)'},
  { name: '정렬(Sorting)'},
  { name: '너비 우선 탐색(BFS)'},
  { name: '깊이 우선 탐색(DFS)'},
  { name: '조합론(Combinations)'},
  { name: '브론즈(Bronze)'},
  { name: '실버(Silver)'},
  { name: '골드(Gold)'},
  { name: '플래티넘(Platinum)'}
]

export default function Random() {
  return (
    <>
      <Gift />

      <Container>
        {titles.map(title => <Subject key={title.name} title={title} />)}
      </Container>
    </>
  )
}

Random.getLayout = function getLayout(random: ReactElement) {
  return (
    <Layout>{random}</Layout>
  )
}
