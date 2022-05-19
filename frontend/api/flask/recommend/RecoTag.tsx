import { flaskapi } from "../Flaskapi"

export const getRecoTag = async (accessToken: string, bojId: string) => {
  return await flaskapi(accessToken).get(`/recomm/freq-tag/${bojId}`).then().catch()
}