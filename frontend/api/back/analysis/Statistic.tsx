import { backapi } from "../BackApi"

export const getStatistic = async (accessToken: string) => {
  return await backapi(accessToken).get(`/analysis/statistics`).then().catch()
}