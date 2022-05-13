import React, { useEffect, useState } from "react"
import Grid from '@mui/material/Grid';
import styled from "styled-components"
import AnalyTitle from "../../common/AnalyTitle"
import SolvedTable from "./SolvedLog/SolvedTable"
import SolvedPagination from "./SolvedLog/SolvedPagination"

import { useRecoilValue } from 'recoil'
import { accessTokenState } from "../../../util/stateCollection"
import { getSolvingLog } from "../../../api/back/analysis/SolvedTable"



const Container = styled.div`
  width: 90%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  overflow: hidden;
`;
const Subcontainer = styled.div`
  display: flex;
  justify-content: center;
`

const Solved = () => {
  const [rows, setRows] = useState([])
  const [currentPage, setPage] = useState(0)

  // 최초진입시 문제표시 api
  const accessToken = useRecoilValue(accessTokenState)
  const solvingLog = async () => {
    await getSolvingLog(accessToken, 0, 20)
      .then(res => {
        console.log(res.data.data)
        setRows(res.data.data)
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
        setRows(res.data.data)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => { 
    SolvingLogPage(currentPage)
  }, [currentPage])

  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid><AnalyTitle>풀이 기록</AnalyTitle></Grid>
        <Grid xs={12}>
          <SolvedTable rows={rows}/>
        </Grid>
        <Grid>
          <SolvedPagination propPage={SolvingLogPage}/>
        </Grid>
      </Grid>
    </Container>
    // <Container>
    //   <AnalyTitle>풀이 기록</AnalyTitle>
    //   <SolvedTable rows={rows}/>
    //   <Subcontainer>
    //     <SolvedPagination propPage={SolvingLogPage}/>
    //   </Subcontainer>
    // </Container>
  )
}

export default Solved
