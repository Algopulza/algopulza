import { flaskapi } from "../Flaskapi"

export const getRandBox = async (accessToken: string, memberId: number) => {
  return await flaskapi(accessToken).get(`/random-level/${memberId}`).then().catch()
}