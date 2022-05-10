import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const userInfoState = atom({
  key: 'userInfoState',
  default: {},
  effects_UNSTABLE: [persistAtom]
})

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: '',
  effects_UNSTABLE: [persistAtom]
})

export const refreshTokenState = atom({
  key: 'refreshTokenState',
  default: '',
  effects_UNSTABLE: [persistAtom]
})

export const pageState = atom({
  key: 'pageState',
  default: '',
})
