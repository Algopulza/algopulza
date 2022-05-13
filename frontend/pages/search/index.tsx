import { ReactElement, useEffect, useState } from 'react'
import Condition from '../../components/search/Condition'
import Result from '../../components/search/Result'
import SearchPagination from '../../components/search/SearchPagination'
import Layout from '../../components/common/Layout'
import styled from 'styled-components'

import { useRecoilValue } from 'recoil'
import { accessTokenState } from '../../util/stateCollection'
import { getProblems, getSearchProblems } from '../../api/back/search/SearchProblems'

const Container = styled.section`
  padding: 2vh 5vw 0 5vw;
`

const Subcontainer = styled.div`
  display: flex;
  justify-content: center;
`

export default function Search() {
  const [rows, setRows] = useState([])
  const [endpage, setEndPage] = useState(0)
  const [searched, setSearched] = useState("")
  const [currentPage, setPage] = useState(0)

  // 최초진입시 문제표시 api
  const accessToken = useRecoilValue(accessTokenState)
  const problemList = async () => {
    await getProblems(accessToken)
      .then(res => {
        setRows(res.data.data)
        // setEndPage(res.data.data.length/20)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => { 
    problemList()
  }, [])

  // 검색 api
  const problemListSearch = async (text: any) => {
    setSearched(text)
    await getSearchProblems(accessToken, searched, 0)
      .then(res => {
        console.log(searched, currentPage)
        setRows(res.data.data)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => { 
    problemListSearch(searched)
  }, [searched])

  // page 검색 api
  const problemListPage = async (page: any) => {
    setPage(page)
    await getSearchProblems(accessToken, searched, currentPage)
      .then(res => {
        console.log(searched, currentPage)
        setRows(res.data.data)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => { 
    problemListPage(currentPage)
  }, [currentPage])

  return (
    <Container>
      <Condition
        propFunction={problemListSearch}
      />
      <Result
        rows={rows}
      />
      <Subcontainer>
        <SearchPagination
          propPage={problemListPage}
          // count={endPage}
        />
      </Subcontainer>
    </Container>
  )
}

Search.getLayout = function getLayout(search: ReactElement) {
  return (
    <Layout>{search}</Layout>
  )
}
