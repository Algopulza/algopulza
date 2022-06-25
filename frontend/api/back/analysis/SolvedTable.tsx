import { backapi } from "../BackApi"

export const getSolvingLog = async (
  accessToken: string,
  page: number,
  size: number
) => {
  return await backapi(accessToken).get(`/solving-log?page=${page}&size=${size}`).then().catch()
}