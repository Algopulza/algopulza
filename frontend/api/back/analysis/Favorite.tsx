import { backapi } from "../BackApi"

export const getFavorites = async (accessToken: string) => {
  return await backapi(accessToken).get(`/problems/mark`).then().catch()
}