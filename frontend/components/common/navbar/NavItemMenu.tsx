import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'
import { menuState } from '../../../util/stateCollection'

const Area = styled.span<{ cond: boolean }>`
  margin: 0 3vw 0 3vw;
  font-size: 1.3vw;
  color: ${(props) => (props.cond ? "#FFC94D" : "#cdcaca")};
  cursor: pointer;
  &:hover {
    color: #FFC94D;
  }
`

type NavItemProps = {
  url: string,
  currentUrl: String,
  onClick(path: string): void
}

export default function NavItemMenu({ url, currentUrl, onClick }: NavItemProps) {
  const router = useRouter()
  const setMenu = useSetRecoilState(menuState)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleCloseTag = () => {
    setMenu('tag')
    onClick(url)
    router.push(url)
    setAnchorEl(null)
  }
  const handleCloseLev = () => {
    setMenu('level')
    onClick(url)
    router.push(url)
    setAnchorEl(null)
  }

  return (
    <>
      <Area
        cond={url == currentUrl ? true : false}
        aria-controls={open ? 'basic-menu' : undefined}
        // aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        랜덤
      </Area>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        style={{ marginTop: 5 }}
      >
        <MenuItem onClick={handleCloseTag}>유형 랜덤</MenuItem>
        <MenuItem onClick={handleCloseLev}>레벨 랜덤</MenuItem>
      </Menu>
    </>
  )
}
