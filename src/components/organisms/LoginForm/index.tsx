import { Modal } from "../../molecules"
import "./index.scss"

type LoginFormProps = {
   isOpen: boolean
   onClose: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({ isOpen, onClose }) => {
   return (
      <Modal open={isOpen} onClose={onClose}>
         <h1>prueba</h1>
      </Modal>
   )
}

export default LoginForm
