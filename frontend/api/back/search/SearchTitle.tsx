import { backapi } from "../BackApi";

export const getSearchTitle = async (accessToken:string) => {
  return await backapi(accessToken).get("/problems/title").then().catch();
};