import { backapi } from "../BackApi";

// 월별 문제 풀이 개수 조회
export const getSolvingLog = async (accessToken:string, page:number, size:number) => {
  return await backapi(accessToken).get(`/analysis/solving-log?page=${page}&size=${size}`).then().catch();
};