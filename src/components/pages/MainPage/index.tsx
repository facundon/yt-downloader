import MainFrame from "../../templates/MainFrame"
import { MouseEvent, useState } from "react"
import { Title } from "../../atoms"
import { OptionsBar, SearchBar, VideoCard } from "../../molecules"
import { YouTubeVideo } from "../../../types/youtube"
import { useAuth } from "../../../hooks"

type MainPageProps = {
   openAccount: (e?: MouseEvent<HTMLButtonElement>) => void
   openList: (e?: MouseEvent<HTMLButtonElement>) => void
}

const MainPage: React.FC<MainPageProps> = ({ openAccount, openList }) => {
   const [searchItems, setSearchItems] = useState<YouTubeVideo[]>([])
   const { logout } = useAuth()

   const handleSearchError = async () => {
      await logout()
      openAccount()
   }

   return (
      <MainFrame
         title={<Title text="YouTube Mp3 Downloader" />}
         searchBar={
            <SearchBar
               setResults={results => setSearchItems(results)}
               setError={handleSearchError}
            />
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
         options={<OptionsBar openAccount={openAccount} openList={openList} />}
      />
   )
}

export default MainPage
