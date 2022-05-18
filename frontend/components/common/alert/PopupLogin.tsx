import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const CustomButton = styled.button<{ cond: boolean }>`
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.cond ? "#FFC94D" : "#545454")}; //#FAFBED
  color: #FFFFFF;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.cond ? "#FFCF62" : "#5C5C5C")};
  }
`

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function PopupLogin() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleCloseWithAgree = () => {
    router.push('/random')
    setOpen(false)
  }

  const handleCloseWithDisgree = () => {
    router.push('/signup')
    setOpen(false)
  }

  return (
    <div>
      <CustomButton
        cond={false}
        onClick={handleClickOpen}
        style={{padding: 0, fontSize: '1.1vw', width: '12vw', height: '2.3vw'}}
      >
        비회원으로 로그인
      </CustomButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseWithDisgree}
      >
        <DialogTitle>{"잠시만요!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="stopwatch">
            <p>
              <span style={{color: 'black', fontWeight: 700}}>회원 가입</span>하시면 풀이기록에 기반하여
            </p>
            <p>
              <span style={{color: 'black', fontWeight: 700}}>맞춤 문제</span>와 <span style={{color: 'black', fontWeight: 700}}>실력 분석 서비스</span>를 제공 받을 수 있어요!
            </p>
            <p>정말 비회원으로 로그인하시겠어요?</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWithDisgree}>회원가입</Button>
          <Button onClick={handleCloseWithAgree}>계속하기</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
