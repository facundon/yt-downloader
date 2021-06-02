import axios, { AxiosRequestConfig } from "axios"
import { ActionName } from "./services/authRequest"

export const baseRequest = axios.create({
   withCredentials: true,
   baseURL: process.env.REACT_APP_BACKEND_API,
})

export const AUTH_ACTION_MAP = new Map<
   ActionName,
   AxiosRequestConfig["method"]
>([
   ["login", "post"],
   ["logout", "get"],
   ["register", "post"],
])

export const ytWatchUrl = "https://youtube.com/watch?v="
