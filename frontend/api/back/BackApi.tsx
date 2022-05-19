import axios from "axios"

export const backapi = (accessToken: string) =>
  axios.create({
    baseURL: "https://k6a408.p.ssafy.io/api/v1/",
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${accessToken}`
    }
  })