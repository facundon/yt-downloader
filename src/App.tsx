import { SearchBar, Title } from "./components"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { YouTubeResponseData } from "./types"

import "./App.scss"

const checkEnvVariables = () => {
   if (
      !process.env.REACT_APP_YOUTUBE_API ||
      !process.env.REACT_APP_YOUTUBE_API_KEY
   )
      throw Error(
         "Need env REACT_APP_YOUTUBE_API and REACT_APP_YOUTUBE_API_KEY"
      )
   return true
}

function App() {
   const handleSearch = (val: string) => {
      if (val && checkEnvVariables()) {
         const axiosCfg: AxiosRequestConfig = {
            params: {
               part: "snippet",
               q: val,
               type: "video",
               maxResults: 10,
               eventType: "completed",
               key: process.env.REACT_APP_YOUTUBE_API_KEY,
            },
         }
         axios
            .get(process.env.REACT_APP_YOUTUBE_API!, axiosCfg)
            .then((val: AxiosResponse<YouTubeResponseData>) => {
               // TODO: show card set with videos
               console.log(val.data.items)
            })
            .catch((error) => {
               if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.error(error.response.data)
                  console.error(error.response.status)
               } else if (error.request) {
                  // The request was made but no response was received
                  console.error(error.request)
               } else {
                  // Something happened in setting up the request that triggered an Error
                  console.error("Error", error.message)
               }
               console.error(error.config)
            })
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
