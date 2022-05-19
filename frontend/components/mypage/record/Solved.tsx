import React, { useEffect, useState } from "react"
import styled from "styled-components"
import AnalyTitle from "../../common/AnalyTitle"
import SolvedTable from "./SolvedLog/SolvedTable"
import SolvedPagination from "./SolvedLog/SolvedPagination"
import AnalyCard from "../../common/card/AnalyCard";

import { useRecoilValue } from 'recoil'
import { accessTokenState } from "../../../util/stateCollection"
import { getSolvingLog } from "../../../api/back/analysis/SolvedTable"
import FormSolved from "../../recommendation/form/FormSolved"
import FormTried from "../../recommendation/form/FormTried"

const Row = styled.div`
  display: flex;
  justify-content: center;
align-items: center;
  gap: 2em;
`;

const Sub = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-top:5rem;
`

const None = styled.div`
display: flex;
align-items: center;
justify-content: center;
font-size: 1.5rem;
`

const Solved = () => {
  const [rows, setRows] = useState([])
  const [currentPage, setPage] = useState(0)
  const [totalpage, setTotalPage] = useState(1)
  const accessToken = useRecoilValue(accessTokenState)

  const handleClick = () => {
    const problemUrl = `https://www.acmicpc.net`
    window.open(problemUrl)
  }

  // page 검색 api
  const SolvingLogPage = async (page: any) => {
    setPage(page)
    await getSolvingLog(accessToken, currentPage, 5)
      .then(res => {
        // console.log(res)
        setRows(res.data.data.content)
        setTotalPage(res.data.data.totalPages)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => { 
    SolvingLogPage(currentPage)
  }, [currentPage])

  return (
    <AnalyCard>
      <AnalyTitle>풀이 기록</AnalyTitle>
      { rows.length==0 ?
        <Sub>
          <None><span onClick={handleClick} style={{color:"blue", cursor:"pointer"}}>acmicpc.net</span> 에 제출한 문제가 없어요</None>
        </Sub> :
        <>
          <Row>
            <SolvedTable rows={rows} />
          </Row>
          <Row>
            <SolvedPagination
              page={currentPage}
              setPage={setPage}
              total={totalpage}
            />
          </Row>
        </>
      }

      <div style={{display: 'flex', justifyContent: 'space-evenly', marginTop: 30}}>
        <FormSolved />
        <FormTried />
      </div>
    </AnalyCard>
  )
}

export default Solved
