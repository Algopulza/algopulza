import { backapi } from "../BackApi"

export const getLanguages = async (accessToken: string) => {
  return await backapi(accessToken).get(`/analysis/languages`).then().catch()
}