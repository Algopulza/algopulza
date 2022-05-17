import axios from 'axios'

export const flaskapi = (accessToken:string) => axios.create({
  baseURL: "https://k6a4081.p.ssafy.io/",
  headers: {
    "Content-Type": `application/json`,
    Authorization: `Bearer ${
      accessToken
    }`,
  },
});