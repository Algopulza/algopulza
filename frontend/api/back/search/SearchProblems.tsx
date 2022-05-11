import { backapi } from "../BackApi";

export const getSearchProblems = async (accessToken:string) => {
  return await backapi(accessToken).get("/problems").then().catch();
};