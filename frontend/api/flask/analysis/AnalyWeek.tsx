import { flaskapi } from "../Flaskapi";

// 취약태그 분석
// 푼 태그 중 푼 문제 가장 적은 태그 분석
export const getAnalyWeek = async (accessToken:string, memberId:number) => {
  return await flaskapi(accessToken).get(`/vulnerability/${memberId}`).then().catch();
};