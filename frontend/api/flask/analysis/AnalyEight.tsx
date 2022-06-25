import { flaskapi } from "../Flaskapi"

export const getAnalyEight = async (accessToken: string, memberId: number) => {
  return await flaskapi(accessToken).get(`/vulnerability/${memberId}`).then().catch()
}