import { NavItemAttr } from '../../../util/dto'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const Text = styled.div<{ cond: boolean }>`
  margin: 0 3vw 0 3vw;
  font-size: 1.3vw;
  color: ${(props) => (props.cond ? "#FFC94D" : "#cdcaca")};
  cursor: pointer;
  &:hover {
    color: #FFC94D;
  }
`

type NavItemProps = {
  navItemAttr: NavItemAttr,
  currentUrl: String,
  onClick(path: string): void
}

export default function NavItem({ navItemAttr, currentUrl, onClick }: NavItemProps) {
  const router = useRouter()

  return (
    <Text
      cond={navItemAttr.url == currentUrl ? true : false}
      onClick={() => { onClick(navItemAttr.url); router.push(navItemAttr.url)}}
    >
      {navItemAttr.page}
    </Text>
  )
}
