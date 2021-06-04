import { useEffect, useState } from "react"
import { ytWatchUrl } from "../../../config"
import { useFavs, useUser, useYoutube } from "../../../hooks"
import { Button } from "../../atoms"
import "./index.scss"

type VideoCardProps = {
   thumbnail: { url: string; width: number; height: number }
   title: string
   duration: string
   id: string
}

const VideoCard: React.FC<VideoCardProps> = ({
   title,
   thumbnail,
   duration,
   id,
}) => {
   const { downloadVideo, downloadLoading, downloadError } = useYoutube()
   const { user } = useUser()
   const { addFav, loading } = useFavs()
   const [isFav, setIsFav] = useState(true)

   useEffect(() => {
      const fav = user?.videos.find(video => video.videoId === id)
      setIsFav(!!fav)
   }, [user?.videos, id])

   return (
      <div
         className={`card-wrapper ${downloadLoading && "loading"} ${
            downloadError && "error"
         }`}
      >
         <a href={ytWatchUrl + id}>
            <div className="thumbnail">
               <img
                  alt={title}
                  src={thumbnail.url}
                  height={thumbnail.height}
                  width={thumbnail.width}
               />
               <p className="duration">{duration}</p>
               <p>{title}</p>
            </div>
         </a>
         <div className="options">
            <Button
               icon={isFav ? "check" : "playlist_add"}
               circle
               appareance="secondary"
               loading={loading}
               disabled={isFav}
               onClick={async () => {
                  const result = await addFav(id, title)
                  if (result) {
                     setIsFav(true)
                  }
               }}
            />
            <Button
               icon="download"
               appareance="subtle"
               loading={downloadLoading}
               onClick={() => downloadVideo(id, title)}
            />
         </div>
      </div>
   )
}

export default VideoCard
