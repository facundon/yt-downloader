import MainFrame from "../../templates/MainFrame"
import { MouseEvent, useState } from "react"
import { Title } from "../../atoms"
import { OptionsBar, SearchBar, VideoCard } from "../../molecules"
import axios from "axios"
import { YouTubeVideo } from "../../../types/youtube"

type MainPageProps = {
   openAccount: (e: MouseEvent<HTMLButtonElement>) => void
   openList: (e: MouseEvent<HTMLButtonElement>) => void
}

const MainPage: React.FC<MainPageProps> = ({ openAccount, openList }) => {
   const [searchItems, setSearchItems] = useState<YouTubeVideo[]>([])
   const [loading, setLoading] = useState(false)

   const handleSearch = async (val: string) => {
      setLoading(true)
      try {
         const response = await axios.get("/api/youtube", {
            baseURL: process.env.REACT_APP_BACKEND_API,
            withCredentials: true,
            params: { search_term: val },
         })
         setSearchItems(response.data)
      } catch (err) {
         console.log(err.message)
      } finally {
         setLoading(false)
      }
   }
   return (
      <>
         <MainFrame
            title={<Title text="YouTube Mp3 Downloader" />}
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
            options={
               <OptionsBar openAccount={openAccount} openList={openList} />
            }
         />
      </>
   )
}

export default MainPage
