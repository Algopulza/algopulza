import { Route } from '../NavBar'
import Link from 'next/link'
import styled from 'styled-components'

const Text = styled.span<{ cond: boolean }>`
  color: ${(props) => (props.cond ? "#FFC94D" : "#000000")};

  &:hover {
    color: #FFC94D;
  }
`

type RouteProps = {
  route: Route,
  isSelected: String,
  onClick(path: string): void
}

export default function NavItem({ route, isSelected, onClick }: RouteProps) {
  const { name, path } = route

  return (
    <Link href={path}>
      <a>
        <Text
          onClick={() => onClick(path)}
          cond={isSelected == path ? true : false}
        >
          {name}
        </Text>
      </a>
    </Link>
  )
}
