import { useRecoilValue } from 'recoil'
import { passwordState } from './stateCollection'


export const checkSpace = (item: string) => {
  if (item.trim() === '') {
    return false
  } else {
    return true
  }
}

export const checkId = (id: string) => {
  if (id === '') {
    return false
  } else {
    return true
  }
}

export const checkPassword = (password: string) => {
  if (password === '') {
    return false
  } else {
    return true
  }
}
