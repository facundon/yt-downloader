import { useCallback, useState } from "react"
import { youtubeSearch } from "../services"

export default function useYoutube() {
   const [state, setState] = useState({ loading: false, error: "" })

   const ytSearch = useCallback(
      async (term: string) => {
         try {
            setState({ loading: true, error: "" })
            const response = await youtubeSearch(term)
            setState(prev => ({ loading: false, error: prev.error }))
            return response.data
         } catch (err) {
            setState({ loading: false, error: err.message || err })
         }
      },
      [setState, state]
   )

   return { ytSearch, ...state }
}
