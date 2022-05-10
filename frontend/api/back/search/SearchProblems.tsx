import { backapi } from "../BackApi";

export const getSearchProblems = async () => {
  return await backapi.get("/problems").then().catch();
};