import { backapi } from "../BackApi";

// 랜덤 문제 리스트 조회
export const getRandom = async (accessToken:string) => {
  return await backapi(accessToken).get("/problems/random").then().catch();
};