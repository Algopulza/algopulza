import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import { useRecoilValue } from 'recoil'
import { accessTokenState, stopwatchHourState, stopwatchLangauge, stopwatchMinState, stopwatchProbIdState, stopwatchSecState } from '../../../util/stateCollection'
import { handleStopwatchClick } from '../../../util/inputHandlerCollection'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function Popup() {
  const [open, setOpen] = React.useState(false)
  const stopwatchProbId = useRecoilValue(stopwatchProbIdState)
  const language = useRecoilValue(stopwatchLangauge)
  const hour = useRecoilValue(stopwatchHourState)
  const min = useRecoilValue(stopwatchMinState)
  const sec = useRecoilValue(stopwatchSecState)
  const accessToken = useRecoilValue(accessTokenState)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleCloseWithAgree = () => {
    handleStopwatchClick(event, stopwatchProbId, language, accessToken)
    setOpen(false)
  }

  const handleCloseWithDisgree = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{padding: 0, fontSize: '1.1vw', width: '3.5vw', height: '2.2vw'}}
      >
        제출
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseWithDisgree}
      >
        <DialogTitle>{"제출하시겠습니까?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="stopwatch">
            <p>문제 번호: {stopwatchProbId}</p>
            <p>사용 언어: {language}</p>
            <p>풀이 시간: {`${hour}시간 ${min}분 ${sec}초`}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWithDisgree}>Disagree</Button>
          <Button onClick={handleCloseWithAgree}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
