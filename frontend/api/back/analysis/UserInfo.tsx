import { backapi } from "../BackApi"

export const getUserInfo = async (accessToken: string, memberId: number) => {
  return await backapi(accessToken).get(`/members/${memberId}`).then().catch()
}