import { backapi } from "../BackApi";

// 풀이 기록 통계 조회
export const getStatistic = async (accessToken:string) => {
  return await backapi(accessToken).get(`/analysis/statistics`).then().catch();
};