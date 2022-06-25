import axios from "axios"

export const backapi = (accessToken: string) =>
  axios.create({
    baseURL: "https://algopulza.day/api/v1/",
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${accessToken}`
    }
  })