import { flaskapi } from "../Flaskapi";

// 유사티어 유저 문제 추천
// 협업필터링 문제 추천
export const getRecoTear = async (accessToken:string, memberId:number) => {
  return await flaskapi(accessToken).get(`/recomm/mf-model/${memberId}`).then().catch();
};