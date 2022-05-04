import InputTextField from '../common/InputTextField'
import ButtonSubmitting from '../common/button/ButtonSubmitting'
import ButtonRedirecting from '../common/button/ButtonRedirecting'
import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default function Form() {
  return (
    <Container>
      <InputTextField />
      <InputTextField />
      <ButtonSubmitting />
      <ButtonRedirecting />
    </Container>
  )
}
