import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import ResultTag from './ResultTag'

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#FFC94D',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
}));

export default function Result(props: any) {
  console.log(props)
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

  return (
    <TableContainer component={Paper} sx={{ marginBottom: '15px' }}>
      <Table aria-label="search" stickyHeader>
        <TableHead sx={{ background: '#FFC94D' }}>
          <TableRow>
            <StyledTableCell align="center" style={{ width: "10%" }}>문제 번호</StyledTableCell>
            <StyledTableCell align="center" style={{ width: "45%" }}>문제 제목</StyledTableCell>
            <StyledTableCell align="center" style={{ width: "10%" }}>티어</StyledTableCell>
            <StyledTableCell align="center" style={{ width: "10%" }}>레벨</StyledTableCell>
            <StyledTableCell align="center" style={{ width: "25%" }}>태그</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.map((row: any) => (
            <TableRow
              key={row.bojId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell align="center" component="th" scope="row">{row.bojId}</StyledTableCell>
              <StyledTableCell align="center">{row.title}</StyledTableCell>
              <StyledTableCell align="center">
                {tierColor(row.tierName)}
              </StyledTableCell>
              <StyledTableCell align="center">{row.tierLevel}</StyledTableCell>
              <StyledTableCell align="center">
                <ResultTag tagList={row.tagList}/>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}