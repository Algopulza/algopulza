import InfoKey from './info/InfoKey'
import InfoValue from './info/InfoValue'
import _ from 'lodash'
import styled from 'styled-components'

const Container = styled.section`
  display: grid;
  grid-template-columns: 30% 40% 30%;
  height: 80px;
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

type CardProps = {
  key: number,
  level: number,
  name: string,
  average: number,
  accept: number,
}

export default function ProblemInfo({key, level, name, average, accept}:CardProps) {
  const range = _.range(3)
  const averages = Math.round(average*100)/100;
  const items = ['티어', '평균 시도', '해결']
  const values = [level?name + level:name, averages, accept]

  return (
    <Container>
      {range.map(index =>
        <Item key={index}>
          <InfoKey item={items[index]} />
          <InfoValue value={values[index]} />
        </Item>)
      }
    </Container>
  )
}
