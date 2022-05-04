import { backapi } from "./api";

export const getRandom = async () => {
  return await backapi.get("/api/v1/problems/random-one").then().catch();
};