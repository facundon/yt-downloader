import { useCallback, useState } from "react"
import { useFavs } from "."
import { wsBackendUrl } from "../config"
import { _searchVideos, _triggerDownload } from "../services"
import { WebSocketMessage } from "../types/server"

export default function useYoutube() {
   const [searchState, setSearchState] = useState({
      searchLoading: false,
      searchError: "",
   })
   const [downloadState, setDownloadState] = useState({
      downloadLoading: false,
      downloadError: "",
   })
   const { delFav } = useFavs()

   const searchVideos = useCallback(
      async (term: string) => {
         try {
            setSearchState({ searchLoading: true, searchError: "" })
            const response = await _searchVideos(term)
            setSearchState(prev => ({
               searchLoading: false,
               searchError: prev.searchError,
            }))
            return response
         } catch (err) {
            setSearchState({
               searchLoading: false,
               searchError: err.message || "Error while searching for videos",
            })
            return null
         }
      },
      [setSearchState]
   )

   const downloadVideo = useCallback(
      (id: string, name: string) => {
         try {
            setDownloadState({ downloadLoading: true, downloadError: "" })
            const socket = new WebSocket(`${wsBackendUrl}/api/converter`)
            socket.addEventListener("open", () => {
               socket.send(id)
            })
            socket.addEventListener("message", async msg => {
               const response: WebSocketMessage = JSON.parse(msg.data)
               switch (response.status) {
                  case "ready":
                     _triggerDownload(response.value, name, id)
                     await delFav()
                     setDownloadState(prev => ({
                        downloadLoading: false,
                        downloadError: prev.downloadError,
                     }))
                     socket.close(1000, "donwload done")
                     break

                  case "error":
                     setDownloadState({
                        downloadLoading: false,
                        downloadError: response.value as string,
                     })
                     socket.close()
                     break
               }
            })
         } catch (err) {
            setDownloadState({
               downloadLoading: false,
               downloadError: err.message || "Error while downloading video",
            })
         }
      },
      [setDownloadState, delFav]
   )

   return {
      searchVideos,
      downloadVideo,
      ...searchState,
      ...downloadState,
      setSearchState,
      setDownloadState,
   }
}
