import { ReactElement } from 'react'
import Layout from '../../components/common/Layout'
import Carousel from '../../components/recommendation/Carousel'
import Subject from '../../components/recommendation/Subject'
import _ from 'lodash'
import styled from 'styled-components'

const Container = styled.section`
  padding: 0vw 5vw;
`

export default function Recommendation() {
  const range = _.range(4)

  return (
    <>
      <Carousel />

      <Container>
        {range.map(index => <Subject key={index} />)}
      </Container>
    </>
  )
}

Recommendation.getLayout = function getLayout(recommendation: ReactElement) {
  return (
    <Layout>{recommendation}</Layout>
  )
}
