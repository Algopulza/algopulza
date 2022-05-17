import { axiosInfo, axiosSignup, axiosStopwatch } from "./axiosCollection"
import { checkStopwatch } from "./validationCollection"

export const sendMessage = (id: string, message: string) => {
  const result = document.getElementById(id)
  result!.innerText = message
  setTimeout(() => {result!.innerText = ''}, 1000)
}

export const sendLongMessage = (id: string, message: string) => {
  const result = document.getElementById(id)
  result!.innerText = message
}

export const handleSignupClick = (
    event: any, id: string, bojId: string, password: string, pwConfirm: string, solvedProblems: string, triedProblems: string, isCheck: boolean, router: any
  ) => {
    if (isCheck) {
      // console.log('not valid')
      sendLongMessage('signupResult', '아이디 중복체크를 먼저 해주세요!')
    } else if (password !== pwConfirm) {
      // console.log('not same')
      sendLongMessage('signupResult', '비밀번호가 일치하지 않습니다.')
    } else {
      axiosSignup(id, bojId, password, solvedProblems, triedProblems)
        .then(res => {
          // console.log(res.data.data)
          router.push('/')
        })
    }
}

export const handleInfoClick = (event: any, info: any, accessToken: string) => {
  if (info.problemBojId.trim() === '') {
    // console.log('not valid')
  } else {
    axiosInfo(info, accessToken)
      .then(res => {
        // console.log(res)
        sendMessage('resultInfo', '감사합니다!')
      })
  }
}

export const handleStopwatchClick = (event: any, problemBojId: string, solvingTime: number, accessToken: string) => {
  const now = Date()

  const info = {
    'problemBojId': problemBojId,
    'memory': 0,
    'runTime': 0,
    'language': '',
    'codeLength': 0,
    'solvingTime': solvingTime,
    'submitTime': now
  }

  if (checkStopwatch(problemBojId)) {
    axiosStopwatch(info, accessToken)
      .then(res => {
        console.log(res)
        sendMessage('stopwatchResult', '감사합니다!')
      })
      .catch(err => {
        console.log(err)
      })
  } else if (problemBojId === '' || Number(problemBojId) < 1000) {
    sendMessage('stopwatchResult', '문제 번호를 입력해주세요.')
  } else if (solvingTime === 0) {
    sendMessage('stopwatchResult', '문제 풀이 시간이 기록되지 않았습니다.')
  }
}
