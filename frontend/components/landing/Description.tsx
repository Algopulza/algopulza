import ServiceName from './description/ServiceName'
import ServiceDescription from './description/ServiceDescription'
import LoginButton from './description/LoginButton'
import ExtensionLink from './description/ExtensionLink'
import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

export default function Description() {
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
