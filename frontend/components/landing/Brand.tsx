import Tab from './Tab'
import BrandName from './brand/BrandName'
import BrandCatchphrase from './brand/BrandCatchphrase'
import Button from '../common/account/Button'
import ButtonLink from '../common/account/ButtonLink'
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
      <Tab />
      <div>
        <BrandName />
        <BrandCatchphrase />
      </div>

      <div>
        <Button />
        <ButtonLink />
      </div>
    </Container>
  )
}
