import { backapi } from "../BackApi";

// 취약태그 분석
// 푼 태그 중 푼 문제 가장 적은 태그 분석
export const getAnalyWeak = async (accessToken:string, count:number) => {
  return await backapi(accessToken).get(`/analysis/weaknesses?count=${count}`).then().catch();
};