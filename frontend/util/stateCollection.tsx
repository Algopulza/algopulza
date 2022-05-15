import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const userInfoState = atom({
  key: 'userInfoState',
  default: {},
  effects_UNSTABLE: [persistAtom]
})

export const bojIdState = atom({
  key: 'bojIdState',
  default: {},
  effects_UNSTABLE: [persistAtom]
})

export const memberIdState = atom({
  key: 'memberIdState',
  default: {},
  effects_UNSTABLE: [persistAtom]
})

export const algoIdState = atom({
  key: 'algoIdState',
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

export const languageSelectionState = atom({
  key: 'languageSelectionState',
  default: '',
})

export const idState = atom({
  key: 'idState',
  default: ''
})
export const passwordState = atom({
  key: 'passwordState',
  default: ''
})

export const submitState = atom({
  key: 'submitState',
  default: false
})
