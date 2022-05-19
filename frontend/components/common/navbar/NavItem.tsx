import { NavItemAttr } from '../../../util/dto'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { showToastError } from '../alert/Alert'

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
  isLogin: boolean
}

export default function NavItem({ navItemAttr, currentUrl, onClick, isLogin }: NavItemProps) {
  const router = useRouter()

  return (
    <Text
      cond={navItemAttr.url == currentUrl ? true : false}
      onClick={isLogin ? () => { onClick(navItemAttr.url); router.push(navItemAttr.url)} : () => showToastError('회원 가입한 유저만 사용 가능합니다.')}
    >
      {navItemAttr.page}
    </Text>
  )
}
