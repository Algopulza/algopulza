import { backapi } from "../BackApi";

// 월별 문제 풀이 개수 조회
export const getSolved = async (accessToken:string) => {
  return await backapi(accessToken).get(`/analysis/solved-count`).then().catch();
};