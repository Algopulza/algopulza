import styled from 'styled-components'
import FormSolved from './form/FormSolved'
import FormTried from './form/FormTried'
import FormInfo from './form/FormInfo'

const Container = styled.section`
  display: grid;
  grid-template-columns: 6fr 2fr 2fr;
  height: 50vh;
  margin-bottom: 80px;
  padding: 0vw 5vw;
  background: #FFC94D;
`

const HistoryContainer = styled.div`
  display: grid;
  grid-template-rows: 5fr 5fr;
  justify-content: center;
  background: #FAFBED;
`

const InfoContainer = styled.div`
  display: grid;
  justify-content: center;
  background: #FAFBED;
`

export default function Form() {
  return (
    <Container>
      <div style={{marginTop: 20}}>
        문제에 대한 정보를 넣어주시면 더 강력한 추천이 가능합니다!
      </div>
      <HistoryContainer>
        <FormSolved />
        <FormTried />
      </HistoryContainer>

      <InfoContainer>
        <FormInfo />
      </InfoContainer>
    </Container>
  )
}
