import { flaskapi } from "../Flaskapi";

// 랜덤문제 - 10개 - 이미 푼
// 이미 푼 문제 중 자신의 티어 +-1 난이도 문제 10개 랜덤추천
export const getSolvedTear = async (memberId:number) => {
  return await flaskapi.get(`/random-solved/${memberId}`).then().catch();
};