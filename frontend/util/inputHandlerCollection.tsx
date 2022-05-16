import { axiosInfo, axiosSignup } from "./axiosCollection"

export const sendMessage = (id: string) => {
  const result = document.getElementById(id)
  result!.innerText = '감사합니다!'
  setTimeout(() => {result!.innerText = ''}, 1000)
}

export const handleSignupClick = (
    event: any, id: string, bojId: string, password: string, solvedProblems: string, triedProblems: string, isCheck: boolean, router: any
  ) => {
    if (isCheck) {
      console.log('not valid')
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
    console.log('not valid')
  } else {
    axiosInfo(info, accessToken)
      .then(res => {
        // console.log(res)
        sendMessage('resultInfo')
      })
  }
}

