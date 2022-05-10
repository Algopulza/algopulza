import { backapi } from "./BackApi";

export const getRenewal = async (bojId:string) => {
  return await backapi.post("/members/renewal", bojId).then().catch();
};