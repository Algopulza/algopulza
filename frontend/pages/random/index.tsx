import { ReactElement, useEffect, useState } from 'react'
import Layout from '../../components/common/Layout'
import Gift from '../../components/random/Gift'
import Subject from '../../components/recommendation/Subject'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.section`
  padding: 0vw 5vw;
`

export async function getRandom() {
  const res = await axios.get("http://k6a408.p.ssafy.io:8081/api/v1/problems/random");
  const posts =res.data.data;
  return{
    props:{
      posts
    }
  }
}

export default function Random() {

  const [data, setData] = useState(
    {
      simulationList : [],
      dpList : [],
      graphList : [],
      greedyList : [],
      sortingList : [],
      bfsList : [],
      dfsList : [],
      combinationList : [],
      bronzeList : [],
      silverList : [],
      goldList : [],
      platinumList : [],
  }
  )
  
  const RandomSub = async () => {
  await getRandom()
    .then((res) => {
      const list = res.props.posts
      setData(list)
    })
    .catch((err) => console.log(err));
};
useEffect(() => {
  RandomSub();
}, []);

const titles = [
  { title: "구현", englishTitle: "Implementation", list: data.simulationList },
  { title: "다이내믹 프로그래밍", englishTitle: "Dynamic Programming", list: data.dpList },
  { title: "그래프", englishTitle: "Graph", list: data.graphList },
  { title: "그리디", englishTitle: "Greedy", list: data.greedyList },
  { title: "정렬", englishTitle: "Sorting", list: data.sortingList },
  { title: "너비 우선 탐색", englishTitle: "BFS", list: data.bfsList },
  { title: "깊이 우선 탐색", englishTitle: "DFS", list: data.dfsList },
  { title: "조합론", englishTitle: "Combinatorics", list: data.combinationList },
  { title: "브론즈", englishTitle: "Bronze", list: data.bronzeList },
  { title: "실버", englishTitle: "Silver", list: data.silverList },
  { title: "골드", englishTitle: "Gold", list: data.goldList },
  { title: "플래티넘", englishTitle: "Platinum", list: data.platinumList },
]

  return (
    <>
      <Gift />

      <Container>
        {titles.map(title => <Subject key={title.title} sub_title={title} />)}
      </Container>
    </>
  )
}

Random.getLayout = function getLayout(random: ReactElement) {
  return (
    <Layout>{random}</Layout>
  )
}