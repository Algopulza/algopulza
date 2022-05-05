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

export default function Form() {
  return (
    <Container>
      <div style={{marginBottom: 30}}>
        <InputTextField
          textFieldAttr={{id: 'id', label:'ID', width: '20vw', password: false, autofocus: true}}
        />
        <InputTextField
          textFieldAttr={{id: 'password', label:'Password', width: '20vw', password: true, autofocus: false}}
        />
        <InputTextField
          textFieldAttr={
            {id: 'passwordConfirmation', label:'Password Confirmation', width: '20vw', password: true, autofocus: false}
          }
        />
        <InputTextField
          textFieldAttr={{id: 'email', label:'Email', width: '20vw', password: false, autofocus: false}}
        />
      </div>

      <div>
        <ButtonSubmitting />
        <ButtonRedirecting />
      </div>
    </Container>
  )
}
