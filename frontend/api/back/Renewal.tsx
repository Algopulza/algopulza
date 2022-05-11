import { backapi } from "./BackApi";

export const getRenewal = async (accessToken:string, bojId:string) => {
  return await backapi(accessToken).post("/members/renewal", bojId).then().catch();
};