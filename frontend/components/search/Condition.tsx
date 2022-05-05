import SelectionTier from './selection/SelectionTier'
import SelectionLevel from './selection/SelectionLevel'
import SelectionTag from './selection/SelectionTag'
import InputTextField from '../common/InputTextField'
import ButtonSubmitting from '../common/button/ButtonSubmitting'
import styled from 'styled-components'

const Container = styled.section`
  display: grid;
  grid-template-columns: 5fr 5fr;
  align-items: center;
`

const Subcontainer = styled.div`
  display: flex;
`

export type TextFieldAttr = {
  id: string,
  label: string,
  width: string,
  password: boolean,
  autofocus: boolean
}

export type SubmittingAttr = { text: string }

export default function Condition() {
  return (
    <Container>
      <Subcontainer>
        <SelectionTier />
        <SelectionLevel />
        <SelectionTag />
      </Subcontainer>
      
      <Subcontainer>
        <InputTextField textFieldAttr={{id: 'search', label: 'Search', width: '20vw', password: false, autofocus: false}} />
        <ButtonSubmitting submittingAttr={{text: '검색'}} />
      </Subcontainer>
    </Container>
  )
}
