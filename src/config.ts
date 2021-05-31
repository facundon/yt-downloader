import axios, { AxiosRequestConfig } from "axios"
import { ActionName } from "./services/authRequest"

export const baseRequest = axios.create({
   withCredentials: true,
   baseURL: process.env.REACT_APP_BACKEND_API,
})

export const ACTION_MAP = new Map<ActionName, AxiosRequestConfig["method"]>([
   ["login", "post"],
   ["logout", "get"],
   ["register", "post"],
])
