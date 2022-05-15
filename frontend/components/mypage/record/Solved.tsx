import React, { useEffect, useState } from "react"
import styled from "styled-components"
import AnalyTitle from "../../common/AnalyTitle"
import SolvedTable from "./SolvedLog/SolvedTable"
import SolvedPagination from "./SolvedLog/SolvedPagination"

import { useRecoilValue } from 'recoil'
import { accessTokenState } from "../../../util/stateCollection"
import { getSolvingLog } from "../../../api/back/analysis/SolvedTable"



const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const Grid = styled.div`
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  gap: 2em;
`;

const Col = styled.div<{size: number}>`
  display: flex;
  flex: ${props => props.size};
  justify-content: center;
  max-height: 40em;
`;

const Solved = () => {
  const [rows, setRows] = useState([])
  const [currentPage, setPage] = useState(0)
  const accessToken = useRecoilValue(accessTokenState)

  // 최초진입시 문제표시 api
  const solvingLog = async () => {
    await getSolvingLog(accessToken, 0, 20)
      .then(res => {
        // console.log(res.data.data.content)
        setRows(res.data.data.content)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => { 
    solvingLog()
  }, [])

  // page 검색 api
  const SolvingLogPage = async (page: any) => {
    setPage(page)
    await getSolvingLog(accessToken, currentPage, 10)
      .then(res => {
        setRows(res.data.data.content)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => { 
    SolvingLogPage(currentPage)
  }, [currentPage])

  return (
    <Container>
      <AnalyTitle>풀이 기록</AnalyTitle>
      <Row>
        <SolvedTable rows={rows}/>
      </Row>
      <Row>
        <SolvedPagination propPage={SolvingLogPage}/>
      </Row>
    </Container>
  )
}

export default Solved
