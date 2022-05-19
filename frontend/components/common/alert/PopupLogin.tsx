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

  const handleClickClose = () => {
    setOpen(false)
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
        비회원으로 이용
      </CustomButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickClose}
      >
        <DialogTitle style={{margin: '0 0 20px 0'}}>{"✋잠시만요!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="stopwatch">
            <p style={{margin: '0 0 10px 0'}}>
              유저의 <span style={{color: 'black', fontWeight: 700}}>풀이기록</span>을 반영한
            </p>
            <p style={{margin: '0 0 20px 0'}}>
              <span style={{color: 'black', fontWeight: 700}}>맞춤 문제</span>와 <span style={{color: 'black', fontWeight: 700}}>실력 분석 서비스</span>를 제공해드립니다!
            </p>
            <p style={{margin: 0, cursor: 'pointer', fontSize: '1vw'}}>
              👉 <span onClick={handleCloseWithDisgree} style={{color: 'black', fontWeight: 700}}>회원 가입</span>하러 가기
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWithAgree}>다음에 할게요</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
