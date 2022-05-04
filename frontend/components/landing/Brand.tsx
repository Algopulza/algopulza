import Tab from './Tab'
import BrandName from './brand/BrandName'
import BrandCatchphrase from './brand/BrandCatchphrase'
import Form from './Form'
import ButtonLogin from '../common/button/ButtonLogin'
import ButtonExtension from '../common/button/ButtonExtension'
import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export default function Brand() {
  return (
    <Container>
      <Tab />
      <div>
        <BrandName />
        <BrandCatchphrase />
      </div>

      <div>
        <Form />
        <ButtonLogin />
        <ButtonExtension />
      </div>
    </Container>
  )
}
