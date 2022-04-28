import SubjectTitle from './SubjectTitle'
import Card from '../common/Card'
import _ from 'lodash'
import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  justify-content: space-around;
  background: #90caf9;
`

export default function Subject() {
  const range = _.range(5)

  return (
    <>
    <SubjectTitle />
    <Container>
      {range.map(index => <Card key={index} />)}
    </Container>
    </>
  )
}
