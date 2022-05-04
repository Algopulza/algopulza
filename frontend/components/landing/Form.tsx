import ServiceCatchphrase from './brand/BrandCatchphrase'
import ButtonLogin from '../common/button/ButtonLogin'
import ButtonExtension from '../common/button/ButtonStranger'
import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

export default function Form() {
  return (
    <Container>
      <div>
        <ServiceCatchphrase />
      </div>

      <div>
        <ButtonLogin />
        <ButtonExtension />
      </div>
    </Container>
  )
}
