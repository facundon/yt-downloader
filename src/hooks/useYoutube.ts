import { useCallback, useState } from "react"
import { _searchVideos, _getSong } from "../services"

export default function useYoutube() {
   const [searchState, setSearchState] = useState({
      searchLoading: false,
      searchError: "",
   })
   const [downloadState, setDownloadState] = useState({
      downloadLoading: false,
      downloadError: "",
   })

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
      async (id: string, name: string) => {
         try {
            setDownloadState({ downloadLoading: true, downloadError: "" })
            await _getSong(id, name)
            setDownloadState(prev => ({
               downloadLoading: false,
               downloadError: prev.downloadError,
            }))
            return true
         } catch (err) {
            setDownloadState({
               downloadLoading: false,
               downloadError: err.message || "Error while downloading video",
            })
            return false
         }
      },
      [setDownloadState]
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
