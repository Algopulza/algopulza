import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useRecoilState } from 'recoil'
import { languageState } from '../../../util/stateCollection'

export default function SelectionLevel() {
  const [language, setLangauge] = useRecoilState(languageState)

  const handleChange = (event: SelectChangeEvent) => {
    setLangauge(event.target.value as string)
  }

  return (
    <FormControl sx={{ width: '15vw' }} size="small">
      <InputLabel id="language">사용언어</InputLabel>
      <Select
        labelId="language"
        id="language"
        value={language}
        label="Language"
        onChange={handleChange}
      >
        <MenuItem value={'Python'}>Python</MenuItem>
        <MenuItem value={'Java'}>Java</MenuItem>
        <MenuItem value={'Kotlin'}>Kotlin</MenuItem>
        <MenuItem value={'C'}>C</MenuItem>
        <MenuItem value={'C++'}>C++</MenuItem>
      </Select>
    </FormControl>
  )
}
