import { useState } from 'react'
import SelectionTier from './selection/SelectionTier'
import SelectionLevel from './selection/SelectionLevel'
import SelectionTag from './selection/SelectionTag'
import InputTextField from '../common/input/InputTextField'
import ButtonSearching from '../common/button/ButtonSearching'
import styled from 'styled-components'

const Container = styled.section`
  display: grid;
  grid-template-columns: 5fr 5fr;
  align-items: center;
  margin-bottom: 20px;
`

const Subcontainer = styled.div<{ cond: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.cond ? "left" : "right")};
  align-items: center;
`
const Grid = styled.div`
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 2em;
`;

const Col = styled.div<{size: number}>`
  display: flex;
  flex: ${props => props.size};
  justify-content: center;
  max-height: 40em;
`;

export type TextFieldAttr = {
  id: string,
  label: string,
  width: string,
  password: boolean,
  autofocus: boolean
}

export type SubmittingAttr = { text: string, width: string }

const handleChange = () => {
  // props 맞추기 위한 null 함수
}

export default function Condition(props: any) {
  const [valid, setValid] = useState(true)
  const [text, setText] = useState("")

  const handleChangeSearched = (event: any) => {
    setText(event.target.value)
  }
  const submitSearched = () => {
    props.propFunction(text)
  }

  
  return (
    <Container>
      <Subcontainer cond={true}>
        {/* <SelectionTier />
        <SelectionLevel />
        <SelectionTag /> */}
      </Subcontainer>
      
      <Subcontainer cond={false}>
        <InputTextField
          textFieldAttr={{id: 'search', label: 'Search', width: '20vw', marginRight: '0px', password: false, autofocus: false}}
          valid={valid}
          validMessage='백준 아이디를 정확히 입력해 주세요.'
          onChange={handleChangeSearched}
          onKeyDown={handleChange}
        />
        <ButtonSearching
          submittingAttr={{text: '검색', width: '5vw'}}
          onClick={submitSearched}
          onKeyDown={submitSearched}
        />
      </Subcontainer>
    </Container>
  )
}
