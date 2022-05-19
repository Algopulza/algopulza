import { showToast } from '../components/common/alert/Alert'
import { axiosInfo, axiosSignup, axiosStopwatch } from './axiosCollection'
import { getCurrentTime } from './getCurrentTime'
import { checkId, checkPassword, checkStopwatch} from './validationCollection'

// 이벤트 핸들러
export const handleSignupClick = (
    event: any, id: string, bojId: string, password: string, pwConfirm: string, isCheck: boolean, isSame: boolean, router: any
  ) => {
    if (id.trim() === '' || bojId.trim() === '' || password.trim() === '') {
      showToast('입력 폼을 완성해주세요.')
    } else if (!checkId(id)) {
      showToast('유효하지 않은 아이디입니다.')
    } else if (!checkPassword(password)) {
      showToast('유효하지 않은 비밀번호입니다.')
    } else if (password !== pwConfirm) {
      showToast('비밀번호가 일치하지 않습니다.')
    } else if (!isCheck) {
      showToast('아이디 중복 검사를 실시해주세요.')
    } else if (isSame) {
      showToast('중복된 아이디입니다.')
    } else {
      axiosSignup(id, bojId, password)
        .then(res => {
          router.push('/')
        })
        .catch(err => {
          if (err.response.data.errorCode === 'M002') {
            showToast('먼저 solved.ac에 가입해주세요!')
          }
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
        // sendMessage('resultInfo', '감사합니다!')
      })
  }
}

export const handleStopwatchClick = (event: any, problemBojId: string, language: string, solved: boolean, accessToken: string) => {
  const min = document.getElementById('min')!.textContent
  const currentTime = getCurrentTime()

  const info = {
    'problemBojId': problemBojId,
    'solvingTime': Number(min),
    'language': language,
    'submitTime': currentTime,
    'status': Number(solved)
  }

  if (checkStopwatch(problemBojId)) {
    axiosStopwatch(info, accessToken)
      .then((res:any) => {
        // console.log(res)
        // sendMessage('stopwatchResult', '감사합니다!')
      })
  } else if (problemBojId === '' || Number(problemBojId) < 1000) {
    // sendLongMessage('stopwatchResult', '문제 번호를 입력해주세요.')
  }
}
