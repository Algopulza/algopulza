import { NavItemAttr } from '../../../util/dto'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { showToast } from '../alert/Alert'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '../../../util/stateCollection'

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
  const [isLogin, setIsLogin] = useState(true)
  const accessToken = useRecoilValue(accessTokenState)

  useEffect(() => {
    setIsLogin(accessToken==='' ? false : true)
  }, [])

  return (
    <Text
      cond={navItemAttr.url == currentUrl ? true : false}
      onClick={isLogin ? () => { onClick(navItemAttr.url); router.push(navItemAttr.url)} : () => showToast('회원 가입한 유저만 사용 가능합니다.')}
    >
      {navItemAttr.page}
    </Text>
  )
}
