import { flaskapi } from "../Flaskapi"

export const getRecoTear = async (accessToken:string, memberId: number) => {
  return await flaskapi(accessToken).get(`/recomm/mf-model/${memberId}`).then().catch()
}