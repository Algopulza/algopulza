import { atom } from 'recoil'

export const userInfoState = atom({
  key: 'userInfoState',
  default: {}
})

export const bojIdState = atom({
  key: 'bojIdState',
  default: {}
})

export const memberIdState = atom({
  key: 'memberIdState',
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
