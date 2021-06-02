import { Button } from "../../atoms"
import "./index.scss"

type VideoCardProps = {
   thumbnail: { url: string; width: number; height: number }
   title: string
   duration: string
   id: string
   handleDownload?: (id: string, title: string) => void
   handleAddToList?: (id: string, title: string) => void
}

const VideoCard: React.FC<VideoCardProps> = ({
   title,
   thumbnail,
   duration,
   id,
   handleDownload,
   handleAddToList,
}) => {
   return (
      <div className="card-wrapper">
         <a href={"https://youtube.com/watch?v=" + id}>
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
               onClick={() => handleAddToList && handleAddToList(id, title)}
            />
            <Button
               icon="download"
               appareance="subtle"
               onClick={() => handleDownload && handleDownload(id, title)}
            />
         </div>
      </div>
   )
}

export default VideoCard
