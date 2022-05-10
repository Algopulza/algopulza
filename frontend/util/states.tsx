import { atom } from 'recoil'

export interface UserInfo {
  member: object;
  accessToken: string;
  refreshToken: string;
}

export const userInfoState = atom({
  key: 'userInfo',
  default: {}
})

export const accessTokenState = atom({
  key: 'accessToken',
  default: ''
})

export const refreshTokenState = atom({
  key: 'refreshToken',
  default: ''
})
