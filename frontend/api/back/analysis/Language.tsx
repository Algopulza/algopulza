import { backapi } from "../BackApi";

// 사용 언어 비율 조회
export const getLanguages = async (accessToken:string) => {
  return await backapi(accessToken).get(`/analysis/languages`).then().catch();
};