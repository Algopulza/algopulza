import { access } from 'fs'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { accessTokenState } from '../../../util/stateCollection'
import { showToastError } from '../../common/alert/Alert'

const Button = styled.button`
  width: 20vw;
  height: 40px;
  background: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 1.1vw;
  color: black;
  cursor: pointer;
`

type TextProps = {
  onClick(): void
  children: string
}

export default function GiftButton({ onClick, children }: TextProps) {
  const accessToken = useRecoilValue(accessTokenState);

  const clickHandler = () => {
    if (accessToken === '' && children.includes('고려')) {
      showToastError('회원 가입한 유저만 사용 가능합니다.')
    } else {
      onClick()
    }
  }

  return <Button onClick={clickHandler}>{children}</Button>
}