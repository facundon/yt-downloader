import { useEffect, useState } from "react"
import { Modal } from "../../molecules"
import { LoginForm, RegisterForm } from "../../organisms"

type AccountModalProps = {
   open: boolean
   onClose: () => void
}

const AccountModal: React.FC<AccountModalProps> = ({ open, onClose }) => {
   const [openSignUp, setOpenSignUp] = useState(false)
   useEffect(() => {
      setTimeout(() => setOpenSignUp(false), 150)
   }, [onClose])
   return (
      <Modal open={open} onClose={onClose} size={"400px"}>
         {openSignUp ? (
            <RegisterForm
               openLogin={() => setOpenSignUp(false)}
               close={onClose}
            />
         ) : (
            <LoginForm openSignUp={() => setOpenSignUp(true)} close={onClose} />
         )}
      </Modal>
   )
}

export default AccountModal
