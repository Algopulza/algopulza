import { flaskapi } from "../Flaskapi"

export const getAnalyEight = async (accessToken: string, bojId: string) => {
  return await flaskapi(accessToken).get(`/vulnerability/${bojId}`).then().catch()
}