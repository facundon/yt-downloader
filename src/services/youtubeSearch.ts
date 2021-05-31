import { AxiosRequestConfig } from "axios"
import { baseRequest } from "../config"

export default async function handleSearch(term: string) {
   try {
      const requestCfg: AxiosRequestConfig = { params: { search_term: term } }
      return await baseRequest.get("/api/youtube", requestCfg)
   } catch (err) {
      throw Error(err.message)
   }
}
