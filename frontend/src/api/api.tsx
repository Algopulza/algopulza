import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": `application/json`,
    Authorization: `Bearer ${
      sessionStorage.getItem("access-token") ||
      localStorage.getItem("access-token")
    }`,
  },
});