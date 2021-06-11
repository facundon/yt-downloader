import { AxiosRequestConfig } from "axios"
import { apiRequest } from "."
import { YouTubeVideo } from "../types/youtube"

const convertBase64ToBlob = (
   b64Data: string,
   contentType = "",
   sliceSize = 512
) => {
   const byteCharacters = atob(b64Data)
   const byteArrays = []
   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize)

      const byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i++) {
         byteNumbers[i] = slice.charCodeAt(i)
      }

      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
   }

   const blob = new Blob(byteArrays, { type: contentType })
   return blob
}

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

export function _triggerDownload(data: string, name: string, id: string) {
   const blobAudio = convertBase64ToBlob(data)
   const url = window.URL.createObjectURL(blobAudio)
   const a = document.createElement("a")
   a.style.display = "none"
   a.href = url
   a.download = name + (id === "all" ? ".zip" : ".mp3")
   document.body.appendChild(a)
   a.click()
   window.URL.revokeObjectURL(url)
   document.body.removeChild(a)
}
