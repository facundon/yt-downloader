import { useEffect } from "react"
import { useUser, useYoutube } from "../../../hooks"
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
   const { downloadVideo, downloadLoading, downloadError, setDownloadState } =
      useYoutube()

   useEffect(() => {
      if (!open) {
         setDownloadState(prev => ({
            downloadLoading: prev.downloadLoading,
            downloadError: "",
         }))
      }
   }, [open, setDownloadState])

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
            onClick={() => downloadVideo("all", "YtDl Favorites")}
         >
            Downlaod All
         </Button>
      </Modal>
   )
}

export default FavModal
