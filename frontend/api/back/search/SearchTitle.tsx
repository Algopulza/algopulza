import { backapi } from "../BackApi";

export const getSearchTitle = async () => {
  return await backapi.get("/problems/title").then().catch();
};