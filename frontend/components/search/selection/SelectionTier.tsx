import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useRecoilState } from 'recoil'
import { filterTierState } from '../../../util/stateCollection'

export default function SelectionTier() {
  const [tier, setTier] = useRecoilState(filterTierState)

  const handleChange = (event: SelectChangeEvent) => {
    setTier(event.target.value as string)
  }

  return (
    <FormControl sx={{ marginRight: '10px', width: '9vw' }} size="small">
      <InputLabel id="tier">티어</InputLabel>
      <Select
        labelId="tier"
        id="tier"
        value={tier}
        label="Tier"
        onChange={handleChange}
      >
        <MenuItem value={''}>전체</MenuItem>
        <MenuItem value={'Bronze'}>브론즈</MenuItem>
        <MenuItem value={'Silver'}>실버</MenuItem>
        <MenuItem value={'Gold'}>골드</MenuItem>
        <MenuItem value={'Platinum'}>플래티넘</MenuItem>
      </Select>
    </FormControl>
  );
}
