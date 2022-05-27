import { flaskapi } from "../Flaskapi"

export const getSolvedTear = async (accessToken: string, memberId: number) => {
  return await flaskapi(accessToken).get(`/random-solved/${memberId}`).then().catch()
}