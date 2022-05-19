import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { useRecoilState } from "recoil"
import { filterTagState } from "../../../util/stateCollection"

export default function SelectionTag() {
  const [tag, setTag] = useRecoilState(filterTagState)

  const handleChange = (event: SelectChangeEvent) => {
    setTag(event.target.value as string)
  }

  return (
    <FormControl sx={{ marginRight: "10px", width: "9vw" }} size="small">
      <InputLabel id="tag">유형</InputLabel>
      <Select
        labelId="tag"
        id="tag"
        value={tag}
        label="Tag"
        onChange={handleChange}
      >
        <MenuItem value={""}>전체</MenuItem>
        <MenuItem value={305}>구현</MenuItem>
        <MenuItem value={204}>DP</MenuItem>
        <MenuItem value={193}>그래프</MenuItem>
        <MenuItem value={210}>그리디</MenuItem>
        <MenuItem value={209}>정렬</MenuItem>
        <MenuItem value={224}>BFS</MenuItem>
        <MenuItem value={227}>DFS</MenuItem>
        <MenuItem value={192}>조합론</MenuItem>
      </Select>
    </FormControl>
  )
}