import { useEffect } from "react"
import { useUser, useYoutube } from "../../../hooks"
import { Button } from "../../atoms"
import { Modal } from "../../molecules"
import { FavList } from "../../organisms"

import "./index.scss"

type FavModalProps = {
   open: boolean
   onClose: () => void
}

const AccountModal: React.FC<FavModalProps> = ({ open, onClose }) => {
   const { user, getUser } = useUser()
   const { downloadLoading } = useYoutube()

   useEffect(() => {
      getUser()
   }, [])

   return (
      <Modal
         className="fav-modal"
         open={open}
         onClose={onClose}
         size={"500px"}
         sideModal
      >
         <h2>Favorites</h2>
         <FavList videos={user?.videos} />
         <Button
            icon="download"
            appareance="secondary"
            loading={downloadLoading}
            disabled={!user?.videos.length}
         >
            Downlaod All
         </Button>
      </Modal>
   )
}

export default AccountModal
