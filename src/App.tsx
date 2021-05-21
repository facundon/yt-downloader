import { SearchBar, Title } from "./components"
import axios, { AxiosRequestConfig } from "axios"

import "./App.scss"
function App() {
   const handleSearch = (val: string) => {
      if (
         !process.env.REACT_APP_YOUTUBE_API ||
         !process.env.REACT_APP_YOUTUBE_API_KEY
      )
         throw Error(
            "Need env REACT_APP_YOUTUBE_API and REACT_APP_YOUTUBE_API_KEY"
         )
      if (val) {
         const axiosCfg: AxiosRequestConfig = {
            headers: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
            params: { part: "snippet", q: val, type: "video", maxResults: 5 },
         }
         axios
            .get(process.env.REACT_APP_YOUTUBE_API, axiosCfg)
            .then((val) => console.log(val))
      }
   }
   return (
      <div className="container">
         <div className="header">
            <Title text="YouTube Downloader" />
            <SearchBar handleSearch={handleSearch} />
         </div>
      </div>
   )
}

export default App
