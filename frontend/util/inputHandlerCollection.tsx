import { axiosSignup } from "./axiosCollection"

export const handleSignupClick = (
    event: any, img: any, id: string, password: string, pwConfrim: string, solvedProblems: string, triedProblems: string
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
          console.log(res.data.data)
        })
    }
}
