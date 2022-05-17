import { backapi } from "../BackApi";

// 문제 풀이 기록 조회
export const getSolvingLog = async (accessToken:string, page:number, size:number) => {
  return await backapi(accessToken).get(`/solving-log?page=${page}&size=${size}`).then().catch();
};