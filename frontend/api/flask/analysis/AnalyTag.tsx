import { flaskapi } from "../Flaskapi"

export const getAnalyTag = async (accessToken: string, bojId: string) => {
  return await flaskapi(accessToken).get(`/freq-tag/${bojId}`).then().catch()
}