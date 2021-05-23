import MainFrame from "../../templates/MainFrame"
import { useState } from "react"
import { Title } from "../../atoms"
import { OptionsBar, SearchBar, VideoCard } from "../../molecules"
import axios, { AxiosResponse } from "axios"
import { convertYouTubeDuration } from "duration-iso-8601"

import {
   YouTubeSearchItem,
   YouTubeSearchResponse,
   YouTubeVideo,
   YouTubeVideoItem,
   YouTubeVideoResponse,
} from "./types"
import { LoginForm } from "../../organisms"

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

const getVideosId = (items: YouTubeSearchItem[]) => {
   let result = ""
   items.forEach(item => (result += item.id.videoId + ","))
   return result
}

const appendVideoDuration = (
   searchItems: YouTubeSearchItem[],
   videoItems: YouTubeVideoItem[]
) => {
   const nextSearchItems: YouTubeVideo[] = Object.assign([], searchItems)
   searchItems.forEach((_, index) => {
      const videoDuration = videoItems[index].contentDetails.duration
      nextSearchItems[index]["duration"] = convertYouTubeDuration(videoDuration)
   })
   return nextSearchItems
}

const MainPage = () => {
   const [searchItems, setSearchItems] = useState<YouTubeVideo[]>([])
   const [loading, setLoading] = useState(false)
   const [isLoginOpen, setIsLoginOpen] = useState(false)

   const handleSearch = async (val: string) => {
      setLoading(true)
      if (val && checkEnvVariables()) {
         const youtubeApi = axios.create({
            params: {
               type: "video",
               maxResults: 9,
               key: process.env.REACT_APP_YOUTUBE_API_KEY,
            },
            baseURL: process.env.REACT_APP_YOUTUBE_API!,
         })
         try {
            const searchResponse: AxiosResponse<YouTubeSearchResponse> =
               await youtubeApi.get("/search", {
                  params: {
                     q: val,
                     part: "snippet",
                  },
               })
            const videosId = getVideosId(searchResponse.data.items)
            const videosResponse: AxiosResponse<YouTubeVideoResponse> =
               await youtubeApi.get("/videos", {
                  params: {
                     part: "contentDetails",
                     id: videosId,
                  },
               })
            setSearchItems(
               appendVideoDuration(
                  searchResponse.data.items,
                  videosResponse.data.items
               )
            )
         } catch (error) {
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
         }
      }
      setLoading(false)
   }
   return (
      <>
         <MainFrame
            title={<Title text="YouTube Downloader" />}
            searchBar={
               <SearchBar handleSearch={handleSearch} loading={loading} />
            }
            searchResults={searchItems?.map(item => (
               <VideoCard
                  key={item.id.videoId}
                  thumbnail={item.snippet.thumbnails.medium}
                  title={item.snippet.title}
                  duration={item.duration}
                  id={item.id.videoId}
               />
            ))}
            options={<OptionsBar setIsLoginOpen={setIsLoginOpen} />}
         />
         <LoginForm
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
         />
      </>
   )
}

export default MainPage
