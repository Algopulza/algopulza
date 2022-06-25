import { backapi } from "../BackApi"

export const getRandomOne = async (accessToken: string) => {
  return await backapi(accessToken).get("/problems/random-one").then().catch()
}