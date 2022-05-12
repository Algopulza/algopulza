import { backapi } from "../BackApi";

// 회원 정보 조회
export const getUserInfo = async (accessToken:string, memberId:number) => {
  return await backapi(accessToken).get(`/members/${memberId}`).then().catch();
};