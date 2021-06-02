import { ytWatchUrl } from "../../../config"
import { useYoutube } from "../../../hooks"
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
   const downloadLoading2 = true
   return (
      <div
         className={`card-wrapper ${downloadLoading2 && "loading"} ${
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
               icon="playlist_add"
               circle
               appareance="secondary"
               onClick={() => null}
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
