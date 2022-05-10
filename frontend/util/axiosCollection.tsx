import axios from 'axios'

export const axiosLogin = (bojId: string) => axios({
  url: 'https://k6a408.p.ssafy.io/api/v1/members',
  method: 'post',
  headers: {
    'bojId': bojId
  }
})
