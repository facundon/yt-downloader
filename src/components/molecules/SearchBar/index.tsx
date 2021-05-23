import { useState } from "react"
import { Input, IconButton } from "../../atoms"
import "./index.scss"

const SearchBar = ({
   handleSearch,
   loading = false,
}: {
   handleSearch: (value: string) => void
   loading?: boolean
}) => {
   const [value, setValue] = useState("")
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
         <IconButton
            icon="search"
            size="md"
            onClick={() => handleSearch(value)}
         />
      </div>
   )
}

export default SearchBar
