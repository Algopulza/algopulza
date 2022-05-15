import { useState, useEffect } from 'react'
import styled from "styled-components"

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 90%;
  height: 90%;
  margin: 10px 10px 20px 10px;
  background: #FFFFFF;
  box-shadow: 0px 2px 10px 5px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
`

const TimeArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  padding: 0 20px;
`

const ButtonArea = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

const Time = styled.div`
  text-align: center;
  font-size: 1.5vw;
`

const Button = styled.button`
  width: 3vw;
  height: 3vw;
  background: #FFC94D;
  border: none;
  border-radius: 15px;
  font-size: 1.1vw;
  cursor: pointer;
`

export default function Stopwatch() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

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

  return (
    <Container>
      <TimeArea >
        <Time>{("0" + Math.floor((time / 3600000) % 60)).slice(-2)}</Time>
        <Time>:</Time>
        <Time>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}</Time>
        <Time>:</Time>
        <Time>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</Time>
        <Time>:</Time>
        <Time style={{fontSize: '1.3vw'}}>{("0" + ((time / 10) % 100)).slice(-2)}</Time>
      </TimeArea>

      <ButtonArea>
        {isRunning ?
          <Button onClick={() => setIsRunning(false)}>멈춤</Button> :
          <Button onClick={() => setIsRunning(true)}>시작</Button>
        }
        <Button style={{background: '#545454', color: '#FFFFFF'}} onClick={() => setTime(0)}>리셋</Button>
        <Button style={{background: '#1A4568', color: '#FFFFFF'}} onClick={() => {}}>전송</Button>
      </ButtonArea>
    </Container>
  )
}
