import ServiceName from './brand/service/ServiceName'
import ServiceDescription from './brand/service/ServiceCatchphrase'
import LoginButton from './brand/ButtonLogin'
import ExtensionLink from './brand/button/ButtonExtension'
import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

export default function Brand() {
  return (
    <Container>
      <div>
        <ServiceName />
        <ServiceDescription />
      </div>

      <div>
        <LoginButton />
        <ExtensionLink />
      </div>
    </Container>
  )
}
