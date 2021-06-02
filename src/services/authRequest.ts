import { AxiosResponse } from "axios"
import { baseRequest, ACTION_MAP } from "../config"
import { User } from "../types/server"

export type ActionName = "login" | "logout" | "register"

export default async function authRequest(
   action: ActionName | undefined = undefined,
   data: {} | undefined = undefined
) {
   const requestCfg = {
      method: ACTION_MAP.get(action!),
      data: data,
      url: `/${action}`,
   }
   try {
      if (!process.env.REACT_APP_BACKEND_API) throw Error("BACKEND_API not set")
      const response: AxiosResponse<User> = await baseRequest(requestCfg)
      return response.data
   } catch (err) {
      throw Error(err.response?.data?.message)
   }
}
