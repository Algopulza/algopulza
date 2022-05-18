import { ReactElement, useEffect, useState } from 'react'
import Condition from '../../components/search/Condition'
import Result from '../../components/search/Result'
import SearchPagination from '../../components/search/SearchPagination'
import Layout from '../../components/common/Layout'
import styled from 'styled-components'
import { NextSeo } from 'next-seo';

import { useRecoilState, useRecoilValue } from 'recoil'
import { accessTokenState, filterLevelState, filterTagState, filterTierState } from '../../util/stateCollection'
import { getSearchProblems } from '../../api/back/search/SearchProblems'
import ButtonFloating from '../../components/common/button/ButtonFloating'

const Container = styled.section`
  padding: 2vh 10vw 80px 10vw;
`

const Subcontainer = styled.div`
  display: flex;
  justify-content: center;
`

export default function Search() {
  const [rows, setRows] = useState([])
  const [currentPage, setPage] = useState(0)
  const [totalpage, setTotalPage] = useState(0)
  const [searched, setSearched] = useState("")
  const [tier, setTier] = useRecoilState(filterTierState)
  const [level, setLevel] = useRecoilState(filterLevelState)
  const [tag, setTag] = useRecoilState(filterTagState)
  const accessToken = useRecoilValue(accessTokenState)

  // 검색 api
  const problemListSearch = async (text: any) => {
    setSearched(text)
    await getSearchProblems(accessToken, 10, 0, tier, level, tag, searched)
      .then(res => {
        // console.log(res.data.data)
        setTotalPage(res.data.data.totalPages)
        setRows(res.data.data.content)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => { 
    problemListSearch(searched)
  }, [searched, tier, level, tag])

  // page 검색 api
  const problemListPage = async (page: any) => {
    setPage(page)
    await getSearchProblems(accessToken, 10, currentPage, undefined, undefined, undefined, searched)
      .then(res => {
        // console.log(res.data.data)
        setRows(res.data.data.content)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => { 
    problemListPage(currentPage)
  }, [currentPage])


  return (
    <Container>
        <NextSeo
				title="검색"
				description="문제를 검색해보아요"
				openGraph={{
					type: 'website',
					url: 'https://www.algopulza.day/search',
					title: '막 풀지 말고, 알고 풀자!',
					description: '문제를 검색해보아요',
					images: [
						{
							url: 'https://www.algopulza.day/common/brand_logo.png',
              alt: '로고 사진'
						},
					],
          site_name: "알고 풀자",
				}}
			/>
      <Condition
        propFunction={problemListSearch}
      />
      <Result
        rows={rows}
      />
      <Subcontainer>
        <SearchPagination
          page={currentPage}
          setPage={setPage}
          totalPage={totalpage}
        />
      </Subcontainer>
      <ButtonFloating />
    </Container>
  )
}

Search.getLayout = function getLayout(search: ReactElement) {
  return (
    <Layout>{search}</Layout>
  )
}
