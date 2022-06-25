import { ReactElement, useEffect, useState } from "react"
import Condition from "../../components/search/Condition"
import Result from "../../components/search/Result"
import SearchPagination from "../../components/search/SearchPagination"
import Layout from "../../components/common/Layout"
import styled from "styled-components"
import { useRecoilValue } from "recoil"
import { accessTokenState, filterLevelState, filterTagState, filterTierState } from "../../util/stateCollection"
import { getSearchProblems } from "../../api/back/search/SearchProblems"
import ButtonFloating from "../../components/common/button/ButtonFloating"

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
  const tier = useRecoilValue(filterTierState)
  const level = useRecoilValue(filterLevelState)
  const tag = useRecoilValue(filterTagState)
  const accessToken = useRecoilValue(accessTokenState)

  const problemListSearch = async (text: any) => {
    setSearched(text)
    await getSearchProblems(accessToken, 10, 0, tier, level, tag, searched)
      .then((res) => {
        setTotalPage(res.data.data.totalPages)
        setRows(res.data.data.content)
        setPage(0)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    problemListSearch(searched)
  }, [searched, tier, level, tag])

  const problemListPage = async (page: any) => {
    setPage(page);
    await getSearchProblems(accessToken, 10, currentPage, tier, level, tag, searched)
      .then((res) => {
        setRows(res.data.data.content)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    problemListPage(currentPage);
  }, [currentPage])

  return (
    <Container>
      <Condition propFunction={problemListSearch} />
      <Result rows={rows} />
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
  return <Layout>{search}</Layout>
}