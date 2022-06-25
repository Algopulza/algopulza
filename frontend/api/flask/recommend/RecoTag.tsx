import { flaskapi } from "../Flaskapi"

export const getRecoTag = async (accessToken: string, memberId: number) => {
  return await flaskapi(accessToken).get(`/recomm/freq-tag/${memberId}`).then().catch()
}