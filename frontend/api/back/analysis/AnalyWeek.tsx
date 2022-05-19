import { backapi } from "../BackApi"

export const getAnalyWeak = async (accessToken: string, count: number) => {
  return await backapi(accessToken).get(`/analysis/weaknesses?count=${count}`).then().catch()
}