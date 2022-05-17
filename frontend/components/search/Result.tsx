import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { StylesProvider } from '@mui/styles';
import styled from "styled-components";
import ResultTag from './ResultTag'


const StyledTableCell = styled(TableCell)`
  background-color: #FFC94D;
  color: #FFFFFF;
  font-weight: 'bold';
`;

const Grid = styled.div`
  text-align: center;
`;

const TextRow = styled.div`
  display: inline-block;
  width: 25em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  &:hover{
    color: #c4c4c4;
  }
`;

export default function Result(props: any) {
<<<<<<< HEAD
  // console.log(props)
=======
>>>>>>> feature/S06P31A408-300
  const { rows } = props
  const tierColor = (tier: string) => {
    const coloredTier = tier
    if (coloredTier=='Unrated') {
      return (<b style={{color: '#c4c4c4'}}>{coloredTier}</b>)
    } else if (coloredTier=='Bronze') {
      return (<b style={{color: '#AD5600'}}>{coloredTier}</b>)
    } else if (coloredTier=='Silver') {
      return (<b style={{color: '#435F7A'}}>{coloredTier}</b>)
    } else if (coloredTier=='Gold') {
      return (<b style={{color: '#EC9A00'}}>{coloredTier}</b>)
    } else if (coloredTier=='Platinum') {
      return (<b style={{color: '#2BE3A5'}}>{coloredTier}</b>)
    } else if (coloredTier=='Diamond') {
      return (<b style={{color: '#00B4FC'}}>{coloredTier}</b>)
    } else if (coloredTier=='Ruby') {
      return (<b style={{color: '#FF0062'}}>{coloredTier}</b>)
    }
    return (<b style={{color: '#000000'}}>{coloredTier}</b>)
  }
  const handleClick = (bojId: number) => {
    const problemUrl = `https://www.acmicpc.net/problem/${bojId}`
    window.open(problemUrl)
  }

  return (
    <TableContainer component={Paper} sx={{ marginBottom: '15px' }}>
      <Table aria-label="search" stickyHeader>
        <TableHead sx={{ background: '#FFC94D' }}>
          <TableRow>
            <StylesProvider injectFirst>
              <StyledTableCell align="center" style={{ width: "10%" }}>ID</StyledTableCell>
              <StyledTableCell align="center" style={{ width: "45%" }}>Problem</StyledTableCell>
              <StyledTableCell align="center" style={{ width: "10%" }}>Tier</StyledTableCell>
              <StyledTableCell align="center" style={{ width: "10%" }}>Level</StyledTableCell>
              <StyledTableCell align="center" style={{ width: "25%" }}>Tag</StyledTableCell>
            </StylesProvider>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.map((row: any) => (
            <TableRow
              key={row.bojId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">{row.bojId}</TableCell>
              <TableCell align="center">
                <Grid><TextRow onClick={() => handleClick(row.bojId)}>{row.title}</TextRow></Grid>
              </TableCell>
              <TableCell align="center">
                {tierColor(row.tierName)}
              </TableCell>
              <TableCell align="center">{row.tierLevel}</TableCell>
              <TableCell align="left">
                <ResultTag tagList={row.tagList}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}