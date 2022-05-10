import { backapi } from "../BackApi";

// 랜덤 문제 리스트 조회
export const getRandom = async () => {
  return await backapi.get("/problems/random").then().catch();
};