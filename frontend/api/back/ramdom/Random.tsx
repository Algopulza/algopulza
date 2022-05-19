import { backapi } from "../BackApi"

export const getRandom = async (accessToken: string) => {
  return await backapi(accessToken).get("/problems/random").then().catch()
}