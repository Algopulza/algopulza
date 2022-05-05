import { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

export default function SelectionTag() {
  const [tag, setTag] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setTag(event.target.value as string)
  }

  return (
    <FormControl sx={{ marginRight: '10px', width: '9vw' }} size="small">
      <InputLabel id="tag">Tag</InputLabel>
      <Select
        labelId="tag"
        id="tag"
        value={tag}
        label="Tag"
        onChange={handleChange}
      >
        <MenuItem value={'impl'}>구현</MenuItem>
        <MenuItem value={'dp'}>DP</MenuItem>
        <MenuItem value={'graph'}>그래프</MenuItem>
        <MenuItem value={'greedy'}>그리디</MenuItem>
        <MenuItem value={'sorting'}>정렬</MenuItem>
        <MenuItem value={'bfs'}>BFS</MenuItem>
        <MenuItem value={'dfs'}>DFS</MenuItem>
        <MenuItem value={'comb'}>조합론</MenuItem>
      </Select>
    </FormControl>
  )
}
