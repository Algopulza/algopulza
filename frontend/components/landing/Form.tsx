import ServiceName from './brand/BrandName'
import ServiceCatchphrase from './brand/BrandCatchphrase'
import ButtonLogin from '../common/account/Button'
import ButtonExtension from '../common/account/ButtonLink'
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
        <ServiceName />
        <ServiceCatchphrase />
      </div>

      <div>
        <ButtonLogin />
        <ButtonExtension />
      </div>
    </Container>
  )
}
