import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { useContext, useEffect, useMemo, useState } from "react"
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

function useLogin() {
   const { user, setUser } = useContext(UserContext)
   const [isLoading, setLoading] = useState(false)

   const request = async (
      action: ActionName | undefined = undefined,
      data: {} | undefined = undefined
   ) => {
      setLoading(true)
      try {
         if (!process.env.REACT_APP_BACKEND_API)
            throw Error("REACT_APP_BACKEND_API not set")
         BASE_REQUEST_CONFIG.method = actionMap.get(action!)
         BASE_REQUEST_CONFIG.data = data
         BASE_REQUEST_CONFIG.url = `/${action}`
         const response: AxiosResponse<User> = await axios(BASE_REQUEST_CONFIG)
         setLoading(false)
         return response.data
      } catch (err) {
         throw Error(err.response?.data?.message)
      }
   }

   const login = async (data: {}) => {
      const response = await request("login", data)
      response && setUser!(response)
   }
   const logout = async () => {
      await request("logout")
      setUser!(null)
   }
   const register = async (data: {}) => await request("register", data)

   return { user, isLoading, login, logout, register }
}

export default useLogin
