import { axiosInfo, axiosSignup } from "./axiosCollection"

export const sendMessage = (id: string) => {
  const result = document.getElementById(id)
  result!.innerText = '감사합니다!'
}

export const handleSignupClick = (
    event: any, img: any, id: string, password: string, pwConfrim: string, solvedProblems: string, triedProblems: string, router: any
  ) => {
    if (password !== pwConfrim) {
      console.log('not valid')
    } else {
      const formData = new FormData()
      formData.append('capturedImage', img)
      formData.append('id', id)
      formData.append('password', password)
      formData.append('solvedProblems', solvedProblems)
      formData.append('triedProblems', triedProblems)

      axiosSignup(formData)
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

