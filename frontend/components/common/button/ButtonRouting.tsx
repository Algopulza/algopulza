import { useRouter } from 'next/router'
import { RoutingAttr } from '../../landing/Routing'
import styled from 'styled-components'

const Container = styled.section`
  margin-right: 1vw;
  color: #545454;
  cursor: pointer;
  &:hover {
    color: #FFC94D;
  }
`

type routingProps = { routingAttr: RoutingAttr }

export default function ButtonRouting({ routingAttr }: routingProps) {
  const router = useRouter()
  function clickHandler() {
    router.push(routingAttr.url)
  }

  return (
    <Container onClick={clickHandler}>{routingAttr.text}</Container>
  )
}
