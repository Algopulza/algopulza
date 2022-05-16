import { axiosInfo, axiosSignup } from "./axiosCollection"

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

