import { flaskapi } from "../Flaskapi"

export const getRandBox = async (accessToken: string, bojId: string) => {
  return await flaskapi(accessToken).get(`/random-level/${bojId}`).then().catch()
}