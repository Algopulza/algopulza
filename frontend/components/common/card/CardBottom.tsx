import BottomTitle from './BottomTitle'
import BottomData from './BottomData'
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

export default function CardBottom() {
  const range = _.range(3)
  const titles = ['티어', '평균 시도', '해결']
  const data = ['Gold 5', '1.5', '13,645']

  return (
    <Container>
      {range.map(index =>
        <Item key={index}>
          <BottomTitle title={titles[index]} />
          <BottomData value={data[index]} />
        </Item>)
      }
    </Container>
  )
}
