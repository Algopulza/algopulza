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
  const handleChange = () => {
    // props 맞추기 위한 null 함수
  }

  return (
    <Container>
      <div style={{marginBottom: 30}}>
        <InputTextField textFieldAttr={{id: 'id', label:'ID', width: '20vw', password: false, autofocus: true}} onChange={handleChange} />
        <InputTextField
          textFieldAttr={{id: 'password', label:'Password', width: '20vw', password: true, autofocus: false}}
          onChange={handleChange}
        />
        <InputTextField
          textFieldAttr={
            {id: 'passwordConfirmation', label:'Password Confirmation', width: '20vw', password: true, autofocus: false}
          }
          onChange={handleChange}
        />
        <InputTextField textFieldAttr={{id: 'email', label:'Email', width: '20vw', password: false, autofocus: false}} onChange={handleChange} />
      </div>

      <div>
        <ButtonSubmitting submittingAttr={{text: '회원가입', width: '20vw'}} onClick={handleChange} />
        <ButtonRedirecting />
      </div>
    </Container>
  )
}
