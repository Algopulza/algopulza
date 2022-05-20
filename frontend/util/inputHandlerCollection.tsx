import { showToastSuccess, showToastError } from '../components/common/alert/Alert'
import { axiosInfo, axiosSignup, axiosStopwatch } from './axiosCollection'
import { getLocalTime } from './getLocalTime'
import { checkId, checkPassword, checkStopwatch} from './validationCollection'

// 메시지 샌더
export const sendLongMessage = (id: string, msg: string) => {
  const msgArea = document.getElementById(id)
  msgArea!.innerText = msg
  setTimeout(() => {
    msgArea!.innerText = ''
  }, 1500)
}

// 이벤트 핸들러
export const handleSignupClick = (
    event: any, id: string, bojId: string, password: string, pwConfirm: string, isCheck: boolean, isSame: boolean, router: any
  ) => {
    if (id.trim() === '' || bojId.trim() === '' || password.trim() === '') {
      sendLongMessage('signupMessage', '입력폼을 완성해주세요.')
    } else if (!checkId(id)) {
      sendLongMessage('signupMessage', '유효하지 않은 아이디입니다.')
    } else if (!checkPassword(password)) {
      sendLongMessage('signupMessage', '유효하지 않은 비밀번호입니다.')
    } else if (password !== pwConfirm) {
      sendLongMessage('signupMessage', '비밀번호가 일치하지 않습니다.')
    } else if (!isCheck) {
      sendLongMessage('signupMessage', '아이디 중복 검사를 실시해주세요.')
    } else if (isSame) {
      sendLongMessage('signupMessage', '중복된 아이디입니다.')
    } else {
      axiosSignup(id, bojId, password)
        .then(res => {
          router.push('/')
        })
        .catch(err => {
          if (err.response.data.errorCode === 'M002') {
            sendLongMessage('signupMessage', '먼저 solved.ac에 가입해주세요!')
          }
        })
    }
}

export const handleInfoClick = (event: any, info: any, accessToken: string) => {
  if (info.problemBojId.trim() === "") {
  } else {
    axiosInfo(info, accessToken).then((res) => {
    })
  }
}

export const handleStopwatchClick = (
  event: any,
  problemBojId: string,
  language: string,
  solved: boolean,
  accessToken: string
) => {
  const min = document.getElementById("min")!.textContent
  const currentTime = getLocalTime()

  const info = {
    problemBojId: problemBojId,
    solvingTime: Number(min),
    language: language,
    submitTime: currentTime,
    status: Number(solved),
  }
  
  axiosStopwatch(info, accessToken)
    .then((res: any) => {
      showToastSuccess('제출해주셔서 감사합니다!')
    })
    .catch(err => {
      showToastError('올바른 문제 번호를 입력해주세요.')
    })

}