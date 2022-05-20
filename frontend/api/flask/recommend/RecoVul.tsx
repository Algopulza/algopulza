import { flaskapi } from "../Flaskapi"

export const getRecoVul = async (accessToken:string, bojId:string) => {
  return await flaskapi(accessToken).get(`/recomm/vulnerability/${bojId}`).then().catch()
}