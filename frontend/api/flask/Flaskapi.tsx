import axios from "axios"

export const flaskapi = (accessToken: string) =>
  axios.create({
    baseURL: "https://algopulza.day/api/",
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${accessToken}`
    }
  })