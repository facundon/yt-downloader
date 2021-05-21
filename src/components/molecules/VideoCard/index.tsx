import { IconButton } from "../../atoms"
import "./index.scss"

type VideoCardProps = {
   thumbnail: { url: string; width: number; height: number }
   title: string
}

const VideoCard: React.FC<VideoCardProps> = ({ title, thumbnail }) => {
   return (
      <div className="card-wrapper">
         <div className="thumbnail">
            <img
               src={thumbnail.url}
               height={thumbnail.height}
               width={thumbnail.width}
            />
            <p>{title}</p>
         </div>
         <div className="options">
            <IconButton icon="playlist_add" circle appareance="secondary" />
            <IconButton icon="download" appareance="subtle" />
         </div>
      </div>
   )
}

export default VideoCard
