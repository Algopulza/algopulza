import axios from 'axios'

export const axiosLogin = (bojId: string) => axios({
  url: 'https://k6a408.p.ssafy.io/api/v1/members',
  method: 'post',
  headers: {
    'bojId': bojId
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

export const axiosImg = (img: any) => axios({
  url: 'https://k6a408.p.ssafy.io/api/v1/members/extractBojId',
  method: 'post',
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  data: img
})

export const axiosId = (id: string) => axios({
  url: `https://k6a408.p.ssafy.io/api/v1/members/checkId`,
  method: 'post',
  data: {
    'id': id
  }
})

export const axiosSignup = ( formData: any ) => axios({
    url: `https://k6a408.p.ssafy.io/api/v1/members/join`,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
})