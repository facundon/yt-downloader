import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

export type APIRoutes =
   | "/login"
   | "/logout"
   | "/register"
   | "/user/favorites"
   | "/api/youtube"
   | "/api/converter"

export default async function apiRequest(
   method: AxiosRequestConfig["method"],
   route: APIRoutes,
   data?: {},
   extraConfig?: AxiosRequestConfig
) {
   const requestCfg: AxiosRequestConfig = {
      method: method,
      url: route,
      data: data,
      withCredentials: true,
      baseURL: process.env.REACT_APP_BACKEND_API,
      ...extraConfig,
   }
   try {
      if (!process.env.REACT_APP_BACKEND_API) throw Error("BACKEND_API not set")
      const response: AxiosResponse = await axios(requestCfg)
      return response.data
   } catch (err) {
      throw Error(err.response?.data?.message)
   }
}
