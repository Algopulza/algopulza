import { backapi } from "../BackApi";

// 마이 페이지 정보 조회
export const getMypage = async (accessToken:string) => {
  return await backapi(accessToken).get(`/analysis`).then().catch();
};