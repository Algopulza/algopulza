
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useRecoilState } from 'recoil'
import { filterLevelState } from '../../../util/stateCollection'

export default function SelectionLevel() {
  const [level, setLevel] = useRecoilState(filterLevelState)

  const handleChange = (event: SelectChangeEvent) => {
    setLevel(event.target.value as string)
  }

  return (
    <FormControl sx={{ marginRight: '10px', width: '9vw' }} size="small">
      <InputLabel id="level">레벨</InputLabel>
      <Select
        labelId="level"
        id="level"
        value={level}
        label="Level"
        onChange={handleChange}
      >
        <MenuItem value={''}>전체</MenuItem>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
      </Select>
    </FormControl>
  )
}
