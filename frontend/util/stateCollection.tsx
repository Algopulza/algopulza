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

export const loginState = atom({
  key: 'loginState',
  default: false,
})

export const idState = atom({
  key: 'idState',
  default: '',
  effects_UNSTABLE: [persistAtom]
})
export const bojIdSignupState = atom({
  key: 'bojIdSignupState',
  default: '',
  effects_UNSTABLE: [persistAtom]
})
export const passwordState = atom({
  key: 'passwordState',
  default: '',
  effects_UNSTABLE: [persistAtom]
})
export const pwConfirmState = atom({
  key: 'pwConfirmState',
  default: '',
})
export const solvedState = atom({
  key: 'solvedState',
  default: '',
})
export const triedState = atom({
  key: 'triedState',
  default: '',
})

export const keywordState = atom({
  key: 'keywordState',
  default: '',
})

export const filterTierState = atom({
  key: 'filterTierState',
  default: '',
})

export const filterLevelState = atom({
  key: 'filterLevelState',
  default: '',
})

export const filterTagState = atom({
  key: 'filterTagState',
  default: '',
})

export const stopwatchProbIdState = atom({
  key: 'stopwatchProbIdState',
  default: '',
})
export const stopwatchMinState = atom({
  key: 'stopwatchMinState',
  default: 0,
})