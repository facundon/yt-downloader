import { useFavs, useUser, useYoutube } from "../../../hooks"
import { Button, Loader } from "../../atoms"
import { Modal } from "../../molecules"
import { FavList } from "../../organisms"

import "./index.scss"

type FavModalProps = {
   open: boolean
   onClose: () => void
}

const FavModal: React.FC<FavModalProps> = ({ open, onClose }) => {
   const { user, loading, error } = useUser()
   const { downloadVideo, downloadLoading, downloadError } = useYoutube()
   const { delFav } = useFavs()

   const handleDownload = async () => {
      const success = await downloadVideo("all", "YtDl Favorites")
      if (success) {
         delFav()
      }
   }

   return (
      <Modal
         className="fav-modal"
         open={open}
         onClose={onClose}
         size={"500px"}
         sideModal
      >
         <h2>Favorites</h2>
         {loading || downloadLoading ? (
            <Loader text="Downloading..." height="10em" />
         ) : error || downloadError ? (
            <p>{error || downloadError}</p>
         ) : (
            <FavList videos={user?.videos} />
         )}
         <Button
            icon="download"
            appareance="secondary"
            loading={downloadLoading}
            loadingText="Downloading"
            disabled={!user?.videos.length || loading}
            onClick={handleDownload}
         >
            Downlaod All
         </Button>
      </Modal>
   )
}

export default FavModal
