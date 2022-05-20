import { flaskapi } from "../Flaskapi"

export const getAnalyTag = async (accessToken: string, memberId: number) => {
  return await flaskapi(accessToken).get(`/freq-tag/${memberId}`).then().catch()
}