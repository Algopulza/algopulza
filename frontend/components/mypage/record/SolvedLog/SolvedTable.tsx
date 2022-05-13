import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'


export default function SolvedTable(props: any) {
  const { rows } = props
  return (
    <TableContainer component={Paper} sx={{ marginBottom: '15px', maxHeight: 350 }}>
      <Table stickyHeader aria-label="solved table">
        <TableHead sx={{ background: '#FFC94D' }}>
          <TableRow>
            <TableCell align="left" style={{ width: "20%" }}>ID</TableCell>
            <TableCell align="left" style={{ width: "40%" }}>Problem</TableCell>
            <TableCell align="center" style={{ width: "10%" }}>Status</TableCell>
            <TableCell align="center" style={{ width: "10%" }}>Language</TableCell>
            <TableCell align="center" style={{ width: "10%" }}>Memory</TableCell>
            <TableCell align="center" style={{ width: "10%" }}>Runtime</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.map((row: any) => (
            <TableRow
              key={row.problemBojId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left" component="th" scope="row">{row.problemBojId}</TableCell>
              <TableCell align="left">{row.problemTitle}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="center">{row.language}</TableCell>
              <TableCell align="center">{row.memory}</TableCell>
              <TableCell align="center">{row.runTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}