import SelectionTier from './selection/SelectionTier'
import SelectionLevel from './selection/SelectionLevel'
import SelectionTag from './selection/SelectionTag'
import InputTextField from '../common/InputTextField'
import ButtonSearching from '../common/button/ButtonSearching'
import styled from 'styled-components'
import { useState } from 'react'

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

export default function Condition() {
  const [valid, setValid] = useState(true)
  
  return (
    <Container>
      <Subcontainer cond={true}>
        <SelectionTier />
        <SelectionLevel />
        <SelectionTag />
      </Subcontainer>
      
      <Subcontainer cond={false}>
        <InputTextField
          textFieldAttr={{id: 'search', label: 'Search', width: '20vw', password: false, autofocus: false}}
          valid={valid}
          validMessage='백준 아이디를 정확히 입력해 주세요.'
          onChange={handleChange}
          onKeyDown={handleChange}
        />
        <ButtonSearching submittingAttr={{text: '검색', width: '5vw'}} />
      </Subcontainer>
    </Container>
  )
}
