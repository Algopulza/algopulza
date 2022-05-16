import { flaskapi } from "../Flaskapi";

// 랜덤박스 - 난이도고려
// 자신의 티어 +-1 난이도 문제 1개 랜덤추천
export const getRandBox = async (accessToken:string, bojId:string) => {
  return await flaskapi(accessToken).get(`/random-level/${bojId}`).then().catch();
};