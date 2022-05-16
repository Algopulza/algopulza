import { flaskapi } from "../Flaskapi";

// 랜덤문제 - 10개 - 이미 푼
// 이미 푼 문제 중 자신의 티어 +-1 난이도 문제 10개 랜덤추천
export const getSolvedTear = async (accessToken:string, bojId:string) => {
  return await flaskapi(accessToken).get(`/random-solved/${bojId}`).then().catch();
};