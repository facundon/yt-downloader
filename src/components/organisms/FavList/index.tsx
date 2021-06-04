import { useFavs, useUser } from "../../../hooks"
import { Video } from "../../../types/server"
import { Button } from "../../atoms"

import "./index.scss"

const FavList = ({ videos }: { videos: Video[] | undefined }) => {
   const { delFav, loading } = useFavs()
   const { user, updateUserContext } = useUser()

   const handleRemove = async (id: number) => {
      await delFav(id)
      const nextVideos = user?.videos.filter(video => video.id !== id)
      updateUserContext({ videos: nextVideos })
   }

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
                     onClick={() => handleRemove(video.id)}
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
