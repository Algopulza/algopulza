import { backapi } from "../BackApi";

// 랜덤 문제 1개 조회
export const getRandomOne = async () => {
  return await backapi.get("/problems/random-one").then().catch();
};