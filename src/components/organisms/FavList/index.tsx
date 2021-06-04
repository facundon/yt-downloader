import { useFavs } from "../../../hooks"
import { Video } from "../../../types/server"
import { Button } from "../../atoms"

import "./index.scss"

const FavList = ({ videos }: { videos: Video[] | undefined }) => {
   const { delFav, loading } = useFavs()

   return (
      <ul className="fav-list">
         {videos?.length ? (
            videos.map(video => (
               <li key={video.id}>
                  {video.title}
                  <Button
                     circle
                     size="sm"
                     icon="delete"
                     appareance="minimalist"
                     loading={loading}
                     onClick={() => delFav(video.id)}
                  />
               </li>
            ))
         ) : (
            <p>
               You can add videos to the list and download them{" "}
               <strong>all together!</strong>
            </p>
         )}
      </ul>
   )
}

export default FavList
