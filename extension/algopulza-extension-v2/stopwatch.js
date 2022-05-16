const btnStart = document.getElementById('btnStart')
const btnReset = document.getElementById('btnReset')
const btnSubmit = document.getElementById('btnSubmit')
const hour = document.getElementById('hour')
const min = document.getElementById('min')
const sec = document.getElementById('sec')
const msec = document.getElementById('msec')

let unit = 0
let flag = false

const setUnit = () => { unit = unit + 10 }
const startHandler = () => {
  if (flag === false ) {
    flag = true
    btnStart.textContent = '멈춤'
    start = setInterval(() => {
      setUnit()
      hour.textContent = ("0" + Math.floor((unit / 3600000) % 60)).slice(-2)
      min.textContent = ("0" + Math.floor((unit / 60000) % 60)).slice(-2)
      sec.textContent = ("0" + Math.floor((unit / 1000) % 60)).slice(-2)
      msec.textContent = ("0" + ((unit / 10) % 100)).slice(-2)
    }, 10)
  } else {
    flag = false
    btnStart.textContent = '시작'
    clearInterval(start)
  }
}
const resetHandler = () => {
  clearInterval(start)
  unit = 0
  hour.textContent = '00'
  min.textContent = '00'
  sec.textContent = '00'
  msec.textContent = '00'
}
const submitHandler = () => {
  console.log(unit)
}

btnStart.addEventListener("click", startHandler)
btnReset.addEventListener("click", resetHandler)
btnSubmit.addEventListener("click", submitHandler)
