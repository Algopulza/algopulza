import axios from "axios"

export const flaskapi = (accessToken: string) =>
  axios.create({
    baseURL: "https://algopulza.day/flask-api/",
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${accessToken}`
    }
  })