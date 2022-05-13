import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'


export default function Result(props: any) {
  const { rows } = props
  return (
    <TableContainer component={Paper} sx={{ marginBottom: '15px' }}>
      <Table aria-label="search" stickyHeader>
        <TableHead sx={{ background: '#FFC94D' }}>
          <TableRow>
            <TableCell align="center" style={{ width: "25%" }}>ID</TableCell>
            <TableCell align="center" style={{ width: "25%" }}>Problem</TableCell>
            <TableCell align="center" style={{ width: "25%" }}>Tier</TableCell>
            <TableCell align="center" style={{ width: "25%" }}>Level</TableCell>
            {/* <TableCell align="center">Tag</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.map((row: any) => (
            <TableRow
              key={row.bojId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">{row.bojId}</TableCell>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">{row.tierName}</TableCell>
              <TableCell align="center">{row.tierLevel}</TableCell>
              {/* <TableCell align="center">{row.tag}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}