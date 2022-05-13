import { backapi } from "../BackApi";

export const getProblems = async (accessToken:string) => {
  return await backapi(accessToken).get("/problems").then().catch();
};

export const getSearchProblems = async (accessToken:string, title:string, page:number) => {
  const url = "/problems/search"+"?page="+page+"&title="+title
  return await backapi(accessToken).get(url).then().catch();
};