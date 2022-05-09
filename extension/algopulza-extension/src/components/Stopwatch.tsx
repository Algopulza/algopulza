import { useEffect, useState } from 'react'
import '../styles/Stopwatch.css'

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
    <div className="content stopwatch-structure">
      <div className="justify">
        <div className='font'>{("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:</div>
        <div className='font'>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</div>
        <div className='font'>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</div>
        <div className='font-small'>{("0" + ((time / 10) % 100)).slice(-2)}</div>
      </div>

      <div className='justify'>
        {isRunning ?
          <button className='button-main button-blue' onClick={() => setIsRunning(false)}>Stop</button>:
          <button className='button-main' onClick={() => setIsRunning(true)}>Start</button>
        }
        <button className='button-main button-black' onClick={() => setTime(0)}>Reset</button> 
      </div>
    </div>
  )
}
