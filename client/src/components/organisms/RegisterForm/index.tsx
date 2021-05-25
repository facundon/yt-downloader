import { Button, Input } from "../../atoms"

import "./index.scss"

type RegisterFormProps = {
   openLogin: () => void
}

const RegisterForm: React.FC<RegisterFormProps> = ({ openLogin }) => {
   return (
      <form>
         <h2>Sign Up</h2>
         <div className="login-wrapper register">
            <Input
               icon="person"
               placeholder="Name"
               type="text"
               name="name"
               autoFocus
            />
            <Input
               icon="alternate_email"
               placeholder="Email"
               type="email"
               name="email"
            />
            <Input
               icon="vpn_key"
               placeholder="Password"
               type="password"
               name="password"
            />
            <Input
               icon="vpn_key"
               placeholder="Repeat Password"
               type="password"
               name="password"
            />
            <Button icon="how_to_reg" appareance="secondary" type="submit">
               Sign Up!
            </Button>
            <p>
               Already have an account?{" "}
               <a
                  href="#"
                  onClick={e => {
                     e.preventDefault()
                     openLogin()
                  }}
               >
                  Log In!
               </a>
            </p>
         </div>
      </form>
   )
}

export default RegisterForm
