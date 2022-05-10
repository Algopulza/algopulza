import { flaskapi } from "../Flaskapi";

// 취약태그 추천
// 푼 태그 중 푼 문제 가장 적은 태그에서 문제 추천
export const getRecoTag = async (memberId:number) => {
  return await flaskapi.get(`/recomm/vulnerability/${memberId}`).then().catch();
};