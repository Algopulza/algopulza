import { api } from "api/api";

export const getRecommend = async () => {
  return await api.get("/recomm/vulnerability").then().catch();
};