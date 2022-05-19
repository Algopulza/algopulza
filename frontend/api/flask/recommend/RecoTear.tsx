import { flaskapi } from "../Flaskapi"

export const getRecoTear = async (accessToken:string, bojId:string) => {
  return await flaskapi(accessToken).get(`/recomm/mf-model/${bojId}`).then().catch()
}