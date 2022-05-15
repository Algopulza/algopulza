import { backapi } from "../BackApi";

// 즐겨찾기 목록 조회
export const getFavorites = async (accessToken:string) => {
  return await backapi(accessToken).get(`/problems/mark`).then().catch();
};