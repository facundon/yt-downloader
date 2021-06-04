import { useCallback, useState } from "react"
import { useUser } from "."
import { apiRequest } from "../services"
import { Video } from "../types/server"

export default function useFavs() {
   const [state, setState] = useState({ loading: false, error: "" })
   const { user, updateUserContext } = useUser()

   const addFav = useCallback(
      async (id: string, title: string) => {
         try {
            setState({ loading: true, error: "" })
            const response: Video[] = await apiRequest(
               "put",
               `/user/favorites/${id}`,
               {
                  title,
               }
            )
            setState(prev => ({ loading: false, error: prev.error }))
            updateUserContext({ videos: response })
            return response
         } catch (err) {
            setState({
               loading: false,
               error: err.message || "Error while adding favorite",
            })
            return false
         }
      },
      [setState, updateUserContext]
   )

   const delFav = useCallback(
      async (id?: number) => {
         try {
            setState({ loading: true, error: "" })
            await apiRequest("delete", `/user/favorites/${id}`)
            setState(prev => ({ loading: false, error: prev.error }))
            const nextVideos = user?.videos.filter(video => video.id !== id)
            updateUserContext({ videos: id ? nextVideos : [] })
         } catch (err) {
            setState({
               loading: false,
               error: err.message || "Error while deleting favorite",
            })
         }
      },
      [setState, updateUserContext, user?.videos]
   )

   return { addFav, delFav, ...state }
}
