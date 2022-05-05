import InputTextField from '../common/InputTextField'
import ButtonSubmitting from '../common/button/ButtonSubmitting'
import ButtonRedirecting from '../common/button/ButtonRedirecting'
import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

export default function Form() {
  return (
    <Container>
      <div style={{marginBottom: 30}}>
        {/* <InputTextField
          textFieldAttr={{id: 'id', label:'ID', width: '20vw', password: false, autofocus: true}}
        />
        <InputTextField
          textFieldAttr={{id: 'password', label:'Password', width: '20vw', password: true, autofocus: false}}
        /> */}
        <InputTextField
          textFieldAttr={{id: 'bojId', label:'BOJ ID', width: '20vw', password: false, autofocus: true}}
        />
      </div>

      <div>
        <ButtonSubmitting submittingAttr={{text: '검색', width: '20vw'}} />
        <ButtonRedirecting />
      </div>
    </Container>
  )
}
