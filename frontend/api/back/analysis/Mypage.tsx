import { backapi } from "../BackApi"

export const getMypage = async (accessToken: string) => {
  return await backapi(accessToken).get(`/analysis`).then().catch()
}