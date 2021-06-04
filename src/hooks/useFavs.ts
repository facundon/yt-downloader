import { useCallback, useContext, useState } from "react"
import { apiRequest } from "../services"
import { UserContext } from "../context/LoginContext"
import { Video } from "../types/server"

export default function useFavs() {
   const { user, setUser } = useContext(UserContext)
   const [state, setState] = useState({ loading: false, error: "" })

   const addFav = useCallback(
      async (id: string, title: string) => {
         try {
            setState({ loading: true, error: "" })
            const response: Video[] = await apiRequest(
               "put",
               "/user/favorites",
               {
                  id,
                  title,
               }
            )
            setState(prev => ({ loading: false, error: prev.error }))
            return response
         } catch (err) {
            setState({
               loading: false,
               error: err.message || "Error while adding favorite",
            })
            return false
         }
      },
      [setState]
   )

   const getFavs = useCallback(async () => {
      try {
         setState({ loading: true, error: "" })
         const response: Video[] = await apiRequest("get", "/user/favorites")
         setState(prev => ({ loading: false, error: prev.error }))
         setUser!(prev => ({ ...prev!, videos: response }))
      } catch (err) {
         setState({
            loading: false,
            error: err.message || "Error while adding favorite",
         })
      }
   }, [setState, setUser])

   const delFav = useCallback(
      async (id: number) => {
         try {
            setState({ loading: true, error: "" })
            await apiRequest("delete", "/user/favorites", {
               id,
            })
            setState(prev => ({ loading: false, error: prev.error }))
         } catch (err) {
            setState({
               loading: false,
               error: err.message || "Error while deleting favorite",
            })
         }
      },
      [setState]
   )

   return { getFavs, addFav, delFav, ...state }
}
