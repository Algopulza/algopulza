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
      <div></div>
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
