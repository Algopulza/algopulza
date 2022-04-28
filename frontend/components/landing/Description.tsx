import ServiceName from './description/ServiceName'
import ServiceDescription from './description/ServiceDescription'
import styled from 'styled-components'

const Container = styled.section`
  
`

export default function Description() {
  return (
    <Container>
      <ServiceName />
      <ServiceDescription />
      <p>This is a login area.</p>
    </Container>
  )
}
