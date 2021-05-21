import { IconButton } from "../../atoms"
import "./index.scss"

type VideoCardProps = {
   thumbnail: { url: string; width: number; height: number }
   title: string
   duration: string
}

const VideoCard: React.FC<VideoCardProps> = ({
   title,
   thumbnail,
   duration,
}) => {
   return (
      <div className="card-wrapper">
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
         <div className="options">
            <IconButton icon="playlist_add" circle appareance="secondary" />
            <IconButton icon="download" appareance="subtle" />
         </div>
      </div>
   )
}

export default VideoCard
