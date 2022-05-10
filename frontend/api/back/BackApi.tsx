import axios from 'axios'

export const backapi = axios.create({
  baseURL: "https://k6a408.p.ssafy.io/api/v1/",
  headers: {
    "Content-Type": `application/json`,
    Authorization: `Bearer ${
      localStorage.getItem("accessToken")
    }`,
  },
});