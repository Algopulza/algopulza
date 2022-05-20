import SelectionTier from "./selection/SelectionTier"
import SelectionLevel from "./selection/SelectionLevel"
import SelectionTag from "./selection/SelectionTag"
import styled from "styled-components"
import { useRecoilState } from "recoil"
import { keywordState } from "../../util/stateCollection"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"

const Container = styled.section`
  display: grid;
  grid-template-columns: 5fr 5fr;
  align-items: end;
  margin-top: 20px;
  margin-bottom: 10px;
`

const Subcontainer = styled.div<{ cond: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.cond ? "left" : "right")};
  align-items: center;
`

export default function Condition(props: any) {
  const [keyword, setKeyword] = useRecoilState(keywordState)
  const submitSearched = () => {
    props.propFunction(keyword)
  }

  const handleChange = (event: any) => {
    setKeyword(event.target.value.trim())
  }

  const onKeyPress = (e: any) => {
    if (e.key === "Enter") {
      props.propFunction(keyword)
    }
  }

  return (
    <Container>
      <Subcontainer cond={true}>
        <SelectionTier />
        <SelectionLevel />
        <SelectionTag />
      </Subcontainer>

      <Subcontainer cond={false}>
        <TextField
          sx={{ width: "30vw", marginBottom: "10px", marginRight: "0px" }}
          id="keyword"
          variant="outlined"
          size="small"
          value={keyword}
          onChange={handleChange}
          onKeyPress={onKeyPress}
          InputProps={{
            endAdornment: (
              <IconButton onClick={submitSearched} onKeyDown={submitSearched}>
                🔍
              </IconButton>
            )
          }}
        />
      </Subcontainer>
    </Container>
  )
}