import { backapi } from "../BackApi";

export const getProblems = async (accessToken:string) => {
  return await backapi(accessToken).get("/problems").then().catch();
};

export const getSearchProblems = async (
  accessToken:string,
  size: number=20,
  page:number=0,
  tierName?: string,
  tierLevel?: string,
  tagIds?: string,
  title?:string,
  ) => {
  let url = `/problems?size=${size}`
  if (page) {url += `&page=${page}`}
  if (tierName) {url += `&tierName=${tierName}`}
  if (tierLevel) {url += `&tierLevel=${tierLevel}`}
  if (tagIds) {url += `&tagIds=${tagIds}`}
  if (title) {url += `&title=${title}`}
  return await backapi(accessToken).get(url).then().catch();
};