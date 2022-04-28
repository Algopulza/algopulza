import ServiceName from './description/ServiceName'
import ServiceDescription from './description/ServiceDescription'
import LoginButton from './description/LoginButton'
import ExtensionButton from './description/ExtensionButton'
import styled from 'styled-components'

const Container = styled.section`
  
`

export default function Description() {
  return (
    <Container>
      <ServiceName />
      <ServiceDescription />
      
      <LoginButton />
      <ExtensionButton />
    </Container>
  )
}
