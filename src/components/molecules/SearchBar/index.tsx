import { useEffect, useState } from "react"
import { Input, Button } from "../../atoms"
import { useYoutube } from "../../../hooks"

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
   const { ytSearch, loading, error } = useYoutube()

   useEffect(() => {
      if (error !== "" && setError) setError(error)
   }, [error])

   const handleSearch = async (term: string) => {
      if (!term) return
      setResults(await ytSearch(term))
   }

   return (
      <div className="search__wrapper">
         <Input
            placeholder="Search"
            onChange={e => setValue(e.target.value)}
            type="search"
            aria-label="Buscar videos"
            onKeyPress={e => e.key === "Enter" && handleSearch(value)}
            loading={loading}
            fontSize="md"
            autoFocus
            required
         />
         <Button icon="search" size="md" onClick={() => handleSearch(value)} />
      </div>
   )
}

export default SearchBar
