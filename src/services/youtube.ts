import { AxiosRequestConfig, AxiosResponse } from "axios"
import { apiRequest } from "."
import { YouTubeVideo } from "../types/youtube"

export async function _searchVideos(term: string) {
   try {
      const requestCfg: AxiosRequestConfig = { params: { search_term: term } }
      const response: YouTubeVideo[] = await apiRequest(
         "get",
         "/api/youtube",
         undefined,
         requestCfg
      )
      return response
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
      const response: BlobPart = await apiRequest(
         "get",
         "/api/converter",
         undefined,
         requestCfg
      )
      const blobAudio = new Blob([response])
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
