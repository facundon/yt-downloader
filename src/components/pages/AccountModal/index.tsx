import { useEffect, useState } from "react"
import { useAuth } from "../../../hooks"
import { Button } from "../../atoms"
import { Modal } from "../../molecules"
import { LoginForm, RegisterForm } from "../../organisms"

type AccountModalProps = {
   open: boolean
   onClose: () => void
}

const AccountModal: React.FC<AccountModalProps> = ({ open, onClose }) => {
   const [openSignUp, setOpenSignUp] = useState(false)

   const { user, logout } = useAuth()

   useEffect(() => {
      setTimeout(() => setOpenSignUp(false), 150)
   }, [onClose])

   return (
      <Modal open={open} onClose={onClose} size={"400px"}>
         {user ? (
            <Button onClick={logout} icon="logout">
               Logout
            </Button>
         ) : openSignUp ? (
            <RegisterForm openLogin={() => setOpenSignUp(false)} />
         ) : (
            <LoginForm openSignUp={() => setOpenSignUp(true)} close={onClose} />
         )}
      </Modal>
   )
}

export default AccountModal
