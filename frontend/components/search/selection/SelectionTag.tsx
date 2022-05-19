import { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useRecoilState } from 'recoil'
import { filterTagState } from '../../../util/stateCollection'

export default function SelectionTag() {
  const [tag, setTag] = useRecoilState(filterTagState)

  const handleChange = (event: SelectChangeEvent) => {
    setTag(event.target.value as string)
  }

  return (
    <FormControl sx={{ marginRight: '10px', width: '9vw' }} size="small">
      <InputLabel id="tag">태그</InputLabel>
      <Select
        labelId="tag"
        id="tag"
        value={tag}
        label="Tag"
        onChange={handleChange}
      >
        <MenuItem value={''}>전체</MenuItem>
        <MenuItem value={46}>구현</MenuItem>
        <MenuItem value={16}>DP</MenuItem>
        <MenuItem value={4}>그래프</MenuItem>
        <MenuItem value={21}>그리디</MenuItem>
        <MenuItem value={43}>정렬</MenuItem>
        <MenuItem value={54}>BFS</MenuItem>
        <MenuItem value={55}>DFS</MenuItem>
        <MenuItem value={3}>조합론</MenuItem>
      </Select>
    </FormControl>
  )
}
