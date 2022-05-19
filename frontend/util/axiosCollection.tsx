import axios from 'axios'

export const axiosLogin = (id: string, password: string) => axios({
  url: 'https://k6a408.p.ssafy.io/api/v1/members/login',
  method: 'post',
  params: {
    'id': id,
    'password': password
  }
})

export const axiosLogout = (memberId: string, accessToken: string) => axios({
  url: `https://k6a408.p.ssafy.io/api/v1/members/logout/${memberId}`,
  method: 'get',
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
})

export const axiosSolved = (bojId: string, problems: string, accessToken: string) => axios({
  url: `https://k6a408.p.ssafy.io/api/v1/members/solved/`,
  method: 'post',
  headers: {
    Authorization: `Bearer ${accessToken}`
  },
  data: {
    'bojId': bojId,
    'problems': problems
  }
})

export const axiosTried = (bojId: string, problems: string, accessToken: string) => axios({
  url: `https://k6a408.p.ssafy.io/api/v1/members/tried/`,
  method: 'post',
  headers: {
    Authorization: `Bearer ${accessToken}`
  },
  data: {
    'bojId': bojId,
    'problems': problems
  }
})

export const axiosId = (id: string) => axios({
  url: `https://k6a408.p.ssafy.io/api/v1/members/checkId`,
  method: 'post',
  data: {
    'id': id
  }
})

export const axiosSignup = ( id: string, bojId: string, password: string ) => axios({
    url: `https://k6a408.p.ssafy.io/api/v1/members/join`,
    method: 'post',
    params: {
      'id': id,
      'bojId': bojId,
      'password': password
    }
})

export const axiosInfo = ( info: object, accessToken: string ) => axios({
  url: `https://k6a408.p.ssafy.io/api/v1/analysis`,
  method: 'post',
  headers: {
    Authorization: `Bearer ${accessToken}`
  },
  data: info
})

export const axiosPutBookmark = ( id: number, accessToken: string ) => axios({
  url: `https://k6a408.p.ssafy.io/api/v1/problems/${id}/mark`,
  method: 'post',
  headers: {
    Authorization: `Bearer ${accessToken}`
  },
  data: id
})

export const axiosDeleteBookmark = ( id: number, accessToken: string ) => axios({
  url: `https://k6a408.p.ssafy.io/api/v1/problems/${id}/mark`,
  method: 'delete',
  headers: {
    Authorization: `Bearer ${accessToken}`
  },
  data: id
})

export const axiosStopwatch = ( info: object, accessToken: string ) => axios({
  url: `https://k6a408.p.ssafy.io/api/v1/solving-log`,
  method: 'post',
  headers: {
    Authorization: `Bearer ${accessToken}`
  },
  data: info
})