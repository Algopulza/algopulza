import { flaskapi } from "../Flaskapi";

// 유저 많이푼태그 문제추천
// 유저가 많이 푼 태그에 해당하는 문제 추천
export const getRecoTag = async (accessToken:string, bojId:string) => {
  return await flaskapi(accessToken).get(`/recomm/freq-tag/${bojId}`).then().catch();
};