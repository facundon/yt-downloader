import { Button } from "../../atoms"
import { Modal } from "../../molecules"
import { FavList } from "../../organisms"

type AccountModalProps = {
   open: boolean
   onClose: () => void
}

const AccountModal: React.FC<AccountModalProps> = ({ open, onClose }) => {
   return (
      <Modal open={open} onClose={onClose} size={"300px"} sideModal>
         <FavList />
         <Button>Downlaod All</Button>
      </Modal>
   )
}

export default AccountModal
