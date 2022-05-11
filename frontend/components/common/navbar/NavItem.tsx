import Link from 'next/link'
import styled from 'styled-components'
import { NavItemAttr } from './NavBar'

const Text = styled.span<{ cond: boolean }>`
  font-size: 1.3vw;
  color: ${(props) => (props.cond ? "#FFC94D" : "#000000")};
  &:hover {
    color: #FFC94D;
  }
`

type NavItemProps = {
  navItem: NavItemAttr,
  isLocated: String,
  onClick(path: string): void
}

export default function NavItem({ navItem, isLocated, onClick }: NavItemProps) {
  return (
    <Link href={navItem.url}>
      <a>
        <Text
          cond={navItem.url == isLocated ? true : false}
          onClick={() => onClick(navItem.url)}
        >
          {navItem.item}
        </Text>
      </a>
    </Link>
  )
}
