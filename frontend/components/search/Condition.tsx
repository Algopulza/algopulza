import SelectionTier from './selection/SelectionTier'
import SelectionLevel from './selection/SelectionLevel'
import SelectionTag from './selection/SelectionTag'
import InputTextField from '../common/InputTextField'
import ButtonSearching from '../common/button/ButtonSearching'
import styled from 'styled-components'

const Container = styled.section`
  display: grid;
  grid-template-columns: 5fr 5fr;
  align-items: center;
  margin-bottom: 30px;
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

export default function Condition() {
  return (
    <Container>
      <Subcontainer cond={true}>
        <SelectionTier />
        <SelectionLevel />
        <SelectionTag />
      </Subcontainer>
      
      <Subcontainer cond={false}>
        <InputTextField textFieldAttr={{id: 'search', label: 'Search', width: '20vw', password: false, autofocus: false}} />
        <ButtonSearching submittingAttr={{text: '검색', width: '5vw'}} />
      </Subcontainer>
    </Container>
  )
}
