import ServiceName from './brand/service/ServiceName'
import ServiceCatchphrase from './brand/service/ServiceCatchphrase'
import ButtonLogin from './brand/button/ButtonLogin'
import ButtonExtension from './brand/button/ButtonExtension'
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
        <ServiceCatchphrase />
      </div>

      <div>
        <ButtonLogin />
        <ButtonExtension />
      </div>
    </Container>
  )
}
