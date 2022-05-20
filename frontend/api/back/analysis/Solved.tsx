import { backapi } from "../BackApi"

export const getSolved = async (accessToken: string) => {
  return await backapi(accessToken).get(`/analysis/solved-count`).then().catch()
}