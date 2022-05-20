import { flaskapi } from "../Flaskapi"

export const getSolvedTear = async (accessToken: string, bojId: string) => {
  return await flaskapi(accessToken).get(`/random-solved/${bojId}`).then().catch()
}