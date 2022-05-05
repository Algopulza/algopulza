import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function createData(
  id: number,
  problem: string,
  tier: string,
  level: number,
  tag: string
) {
  return { id, problem, tier, level, tag }
}

const rows = [
  createData(14403, '로봇 청소기', '골드', 5, '구현'),
  createData(14403, '로봇 청소기', '골드', 5, '구현'),
  createData(14403, '로봇 청소기', '골드', 5, '구현'),
  createData(14403, '로봇 청소기', '골드', 5, '구현'),
  createData(14403, '로봇 청소기', '골드', 5, '구현'),
  createData(14403, '로봇 청소기', '골드', 5, '구현'),
  createData(14403, '로봇 청소기', '골드', 5, '구현'),
  createData(14403, '로봇 청소기', '골드', 5, '구현'),
  createData(14403, '로봇 청소기', '골드', 5, '구현'),
  createData(14403, '로봇 청소기', '골드', 5, '구현')
]

export default function Result() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="search">
        <TableHead sx={{ background: '#FFC94D' }}>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Problem</TableCell>
            <TableCell align="center">Tier</TableCell>
            <TableCell align="center">Level</TableCell>
            <TableCell align="center">Tag</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">{row.id}</TableCell>
              <TableCell align="center">{row.problem}</TableCell>
              <TableCell align="center">{row.tier}</TableCell>
              <TableCell align="center">{row.level}</TableCell>
              <TableCell align="center">{row.tag}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
