import { AxiosRequestConfig, AxiosResponse } from "axios"
import { baseRequest } from "../config"
import { YouTubeVideo } from "../types/youtube"

export async function _searchVideos(term: string) {
   try {
      const requestCfg: AxiosRequestConfig = { params: { search_term: term } }
      const response: AxiosResponse<YouTubeVideo[]> = await baseRequest.get(
         "/api/youtube",
         requestCfg
      )
      return response.data
   } catch (err) {
      throw Error(err.message)
   }
}

export async function _getSong(id: string, name: string) {
   try {
      const requestCfg: AxiosRequestConfig = {
         params: { id },
         responseType: "blob",
      }
      const response: AxiosResponse<BlobPart> = await baseRequest.get(
         "/api/converter",
         requestCfg
      )
      const blobAudio = new Blob([response.data])
      const url = window.URL.createObjectURL(blobAudio)
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url
      a.download = name + ".mp3"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
   } catch (err) {
      throw Error(err.message)
   }
}
