import { atom } from 'recoil'

export const userInfoState = atom({
  key: 'userInfoState',
  default: {}
})

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: ''
})

export const refreshTokenState = atom({
  key: 'refreshTokenState',
  default: ''
})
