import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { useCallback, useContext } from "react"
import { UserContext } from "../context/LoginContext"
import { User } from "../types/server"

type ActionName = "login" | "logout" | "register"
const actionMap = new Map<ActionName, AxiosRequestConfig["method"]>()
actionMap.set("login", "post")
actionMap.set("logout", "get")
actionMap.set("register", "post")

const BASE_REQUEST_CONFIG: AxiosRequestConfig = {
   withCredentials: true,
   baseURL: process.env.REACT_APP_BACKEND_API,
}

function useAuth() {
   const { user, setUser } = useContext(UserContext)

   const request = async (
      action: ActionName | undefined = undefined,
      data: {} | undefined = undefined
   ) => {
      try {
         if (!process.env.REACT_APP_BACKEND_API)
            throw Error("BACKEND_API not set")
         BASE_REQUEST_CONFIG.method = actionMap.get(action!)
         BASE_REQUEST_CONFIG.data = data
         BASE_REQUEST_CONFIG.url = `/${action}`
         const response: AxiosResponse<User> = await axios(BASE_REQUEST_CONFIG)
         return response.data
      } catch (err) {
         throw Error(err.response?.data?.message)
      }
   }

   const login = useCallback(
      async (data: {}) => {
         const response = await request("login", data)
         if (response) {
            setUser!(response)
            localStorage.setItem("user", JSON.stringify(response))
         }
      },
      [setUser]
   )

   const logout = useCallback(async () => {
      await request("logout")
      setUser!(null)
      localStorage.removeItem("user")
   }, [setUser])

   const register = async (data: {}) => await request("register", data)

   return { user, login, logout, register }
}

export default useAuth
