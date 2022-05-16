import Link from 'next/link'
import styled from 'styled-components'
import { NavItemAttr } from '../../../util/dto'

const Text = styled.span<{ cond: boolean }>`
  margin: 0 3vw 0 3vw;
  font-size: 1.3vw;
  color: ${(props) => (props.cond ? "#FFC94D" : "#000000")};
  &:hover {
    color: #FFC94D;
  }
`

type NavItemProps = {
  navItemAttr: NavItemAttr,
  isLocated: String,
  onClick(path: string): void
}

export default function NavItem({ navItemAttr, isLocated, onClick }: NavItemProps) {
  console.log(navItemAttr.url)
  console.log(isLocated)
  return (
    <Link href={navItemAttr.url}>
      <a>
        <Text
          cond={navItemAttr.url == isLocated ? true : false}
          onClick={() => onClick(navItemAttr.url)}
        >
          {navItemAttr.item}
        </Text>
      </a>
    </Link>
  )
}
