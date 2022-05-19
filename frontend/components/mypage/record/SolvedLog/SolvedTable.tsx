import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { styled as muistyled } from "@mui/material/styles"
import styled from "styled-components"

const StyledTableCell = muistyled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#282828",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: "0.8em",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "0.8em",
  },
}))

const Grid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const TextRow = styled.div`
  display: inline-block;
  width: 10rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  &:hover {
    color: #c4c4c4;
  }
`

export default function SolvedTable(props: any) {
  const { rows } = props
  const statusColor = (status: string) => {
    const coloredStatus = status
    if (coloredStatus == "solved") {
      return <b style={{ color: "#009874" }}>{coloredStatus}</b>
    }
    return <b style={{ color: "#E45624" }}>{coloredStatus}</b>
  }
  const handleClick = (bojId: any) => {
    const problemUrl = `https://www.acmicpc.net/problem/${bojId}`
    window.open(problemUrl)
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ marginBottom: "15px", maxHeight: 500 }}
    >
      <Table stickyHeader aria-label="solved table">
        <TableHead sx={{ background: "#FFC94D" }}>
          <TableRow>
            <StyledTableCell align="center" style={{ width: "15%" }}>문제번호</StyledTableCell>
            <StyledTableCell align="center" style={{ width: "40%" }}>문제제목</StyledTableCell>
            <StyledTableCell align="center" style={{ width: "5%" }}>상태</StyledTableCell>
            <StyledTableCell align="center" style={{ width: "5%" }}>언어</StyledTableCell>
            <StyledTableCell align="center" style={{ width: "15%" }}>풀이시간</StyledTableCell>
            <StyledTableCell align="center" style={{ width: "20%" }}>제출시간</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row: any, index: number) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell align="center" component="th" scope="row">
                  {row.problemBojId}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Grid>
                    <TextRow onClick={() => handleClick(row.problemBojId)}>
                      {row.problemTitle}
                    </TextRow>
                  </Grid>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {statusColor(row.status)}
                </StyledTableCell>
                <StyledTableCell align="center">{row.language}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.runTime}
                  <span style={{ color: "#E45624" }}> ms</span>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.submitTime}
                </StyledTableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}