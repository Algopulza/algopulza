import { api } from "api/api";

export const getWeek = async () => {
  return await api.get("user/vulnerability").then().catch();
};