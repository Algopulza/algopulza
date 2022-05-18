import { useState, useEffect } from 'react'
import ImgButtonPlay from '../../../common/button/imgButton/ImgButtonPlay'
import ImgButtonPause from '../../../common/button/imgButton/ImgButtonPause'
import ImgButtonReset from '../../../common/button/imgButton/ImgButtonReset'
import styled from "styled-components"
import { useSetRecoilState } from 'recoil'
import { stopwatchHourState, stopwatchMinState, stopwatchSecState } from '../../../../util/stateCollection'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Digit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2vw;
`

export default function Time() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const setHour = useSetRecoilState(stopwatchHourState)
  const setMin = useSetRecoilState(stopwatchMinState)
  const setSec = useSetRecoilState(stopwatchSecState)

  useEffect(() => {
    let interval: any

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10)
      }, 10)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const setTimeInfo = () => {
    const hour = Number(document.getElementById('hour')!.textContent)
    const min = Number(document.getElementById('min')!.textContent)
    const sec = Number(document.getElementById('sec')!.textContent)
    setHour(hour)
    setMin(min)
    setSec(sec)
  }

  const resetTimeInfo = () => {
    setHour(0)
    setMin(0)
    setSec(0)
  }

  return (
    <>
      <Container style={{marginRight: 10}}>
        <Digit id="hour">{("0" + Math.floor((time / 3600000) % 60)).slice(-2)}</Digit>
        <Digit>:</Digit>
        <Digit id="min">{("0" + Math.floor((time / 60000) % 60)).slice(-2)}</Digit>
        <Digit>:</Digit>
        <Digit id="sec">{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</Digit>
        <Digit>:</Digit>
        <Digit>{("0" + ((time / 10) % 100)).slice(-2)}</Digit>
      </Container>

      <Container>
        {isRunning ?
          <div style={{marginRight: 10}}>
            <ImgButtonPause
              submittingAttr={{text: 'pause', width: '2.2vw', height: '2.2vw', marBot: '0px', fontSize: '1.1vw'}}
              isImportant={false}
              onClick={() => {
                setIsRunning(false)
                setTimeInfo()
              }}
            />
          </div> :
          <div style={{marginRight: 10}}>
            <ImgButtonPlay
              submittingAttr={{text: 'play', width: '2.2vw', height: '2.2vw', marBot: '0px', fontSize: '1.1vw'}}
              isImportant={false}
              onClick={() => {setIsRunning(true)}}
            />
          </div>
        }
        <div style={{marginRight: 10}}>
          <ImgButtonReset
            submittingAttr={{text: 'reset', width: '2.2vw', height: '2.2vw', marBot: '0px', fontSize: '1.1vw'}}
            isImportant={false}
            onClick={() => {
              setIsRunning(false)
              setTime(0)
              resetTimeInfo()
            }}
          />
        </div>
      </Container>
    </>
  )
}
