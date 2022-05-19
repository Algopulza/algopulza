
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useRecoilState } from 'recoil'
import { stopwatchLangauge } from '../../../../util/stateCollection'

export default function SelectionLanguage() {
  const [language, setLanguage] = useRecoilState(stopwatchLangauge)

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string)
  }

  return (
    <FormControl sx={{ marginRight: '10px', width: '8vw' }} size="small">
      <InputLabel id="language">사용 언어</InputLabel>
      <Select
        labelId="language"
        id="language"
        value={language}
        label="사용 언어"
        onChange={handleChange}
      >
        <MenuItem value={'python'}>Python</MenuItem>
        <MenuItem value={'java'}>Java</MenuItem>
        <MenuItem value={'kotlin'}>Kotlin</MenuItem>
        <MenuItem value={'c++'}>C++</MenuItem>
        <MenuItem value={'c'}>C</MenuItem>
      </Select>
    </FormControl>
  )
}
