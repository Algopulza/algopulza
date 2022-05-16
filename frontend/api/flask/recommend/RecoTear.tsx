import { flaskapi } from "../Flaskapi";

// 유사티어 유저 문제 추천
// 협업필터링 문제 추천
export const getRecoTear = async (accessToken:string, bojId:string) => {
  return await flaskapi(accessToken).get(`/recomm/mf-model/${bojId}`).then().catch();
};