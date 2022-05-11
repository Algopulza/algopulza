import { flaskapi } from "../Flaskapi";

// 취약태그 추천
// 푼 태그 중 푼 문제 가장 적은 태그에서 문제 추천
export const getRecoVul = async (accessToken:string, memberId:string) => {
  return await flaskapi(accessToken).get(`/recomm/vulnerability/${memberId}`).then().catch();
};