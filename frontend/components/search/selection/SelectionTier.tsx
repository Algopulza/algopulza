import { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

export default function SelectionTier() {
  const [tier, setTier] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setTier(event.target.value as string)
  }

  return (
    <FormControl sx={{ marginRight: '10px', width: '9vw' }} size="small">
      <InputLabel id="tier">Tier</InputLabel>
      <Select
        labelId="tier"
        id="tier"
        value={tier}
        label="Tier"
        onChange={handleChange}
      >
        <MenuItem value={'bronze'}>브론즈</MenuItem>
        <MenuItem value={'silver'}>실버</MenuItem>
        <MenuItem value={'gold'}>골드</MenuItem>
        <MenuItem value={'platinum'}>플래티넘</MenuItem>
      </Select>
    </FormControl>
  );
}
