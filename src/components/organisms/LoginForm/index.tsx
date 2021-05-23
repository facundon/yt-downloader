import { Input } from "../../atoms"
import { Modal } from "../../molecules"
import "./index.scss"

type LoginFormProps = {
   isOpen: boolean
   onClose: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({ isOpen, onClose }) => {
   return (
      <Modal open={isOpen} onClose={onClose} size={"400px"}>
         <h2>LogIn</h2>
         <form>
            <div className="inputs">
               <Input
                  icon="alternate_email"
                  placeholder="Email"
                  type="email"
                  autoFocus
               />
               <Input icon="vpn_key" placeholder="Password" type="password" />
            </div>
            <div className="actions"></div>
         </form>
      </Modal>
   )
}

export default LoginForm
