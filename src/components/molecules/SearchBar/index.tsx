import { useEffect, useState } from "react"
import { Input, Button } from "../../atoms"
import { useFavs, useYoutube } from "../../../hooks"

import "./index.scss"
import { YouTubeVideo } from "../../../types/youtube"

const SearchBar = ({
   setResults,
   setError,
}: {
   setResults: (results: YouTubeVideo[]) => void
   setError?: (error: string) => void
}) => {
   const [value, setValue] = useState("")
   const { searchVideos, searchLoading, searchError } = useYoutube()
   const { getFavs } = useFavs()

   useEffect(() => {
      if (searchError !== "" && setError) setError(searchError)
   }, [searchError, setError])

   const handleSearch = async (term: string) => {
      if (!term) return
      const results = await searchVideos(term)
      if (!results) return
      setResults(results)
      getFavs()
   }

   return (
      <div className="search__wrapper">
         <Input
            placeholder="Search"
            onChange={e => setValue(e.target.value)}
            type="search"
            aria-label="Buscar videos"
            onKeyPress={e => e.key === "Enter" && handleSearch(value)}
            loading={searchLoading}
            fontSize="md"
            autoFocus
            required
         />
         <Button icon="search" size="md" onClick={() => handleSearch(value)} />
      </div>
   )
}

export default SearchBar
