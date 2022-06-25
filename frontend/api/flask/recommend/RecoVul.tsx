import { flaskapi } from "../Flaskapi"

export const getRecoVul = async (accessToken:string, memberId: number) => {
  return await flaskapi(accessToken).get(`/recomm/vulnerability/${memberId}`).then().catch()
}