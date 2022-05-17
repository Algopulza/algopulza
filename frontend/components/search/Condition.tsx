import SelectionTier from './selection/SelectionTier'
import SelectionLevel from './selection/SelectionLevel'
import SelectionTag from './selection/SelectionTag'
import InputTextField from '../common/input/InputTextField'
import ButtonSearching from '../common/button/ButtonSearching'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { keywordState } from '../../util/stateCollection'
import { nothing } from '../../util/validationCollection'


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


export default function Condition(props: any) {
  const [keyword, setKeyword] = useRecoilState(keywordState)
  const submitSearched = () => { props.propFunction(keyword) }

  return (
    <Container>
      <Subcontainer cond={true}>
        <SelectionTier />
        <SelectionLevel />
        <SelectionTag />
      </Subcontainer>
      
      <Subcontainer cond={false}>          
        <InputTextField
          textFieldAttr={{width: '20vw', id: 'keyword', label: 'Search', marBot: '10px', marRig: '0px', isPw: false, isAf: false}}
          valid={nothing}
          errorMessage='검색어를 입력해주세요.'
          setter={setKeyword}
          onKeyDown={() => {}}
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
