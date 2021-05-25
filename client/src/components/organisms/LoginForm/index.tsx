import { Input, Button } from "../../atoms"
import Google from "../../../icons/google.svg"
import Facebook from "../../../icons/facebook.svg"

import "./index.scss"

type LoginFormProps = {
   openSignUp: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({ openSignUp }) => {
   return (
      <form>
         <h2>Log In</h2>
         <div className="login-wrapper">
            <Input
               icon="alternate_email"
               placeholder="Email"
               type="email"
               name="email"
               autoFocus
            />
            <Input
               icon="vpn_key"
               placeholder="Password"
               type="password"
               name="password"
            />
            <Button appareance="link">Forgot Password?</Button>
            <Button icon="login" appareance="secondary" type="submit">
               Login
            </Button>
            <p>Or log in using</p>
            <div className="social-media">
               <a href="https://google.com.ar">
                  <img src={Google} alt="Sign in with google" />
               </a>
               <a href="https://google.com.ar">
                  <img src={Facebook} alt="Sign in with facebook" />
               </a>
            </div>
            <span>
               Dont have an account?{" "}
               <Button appareance="link" onClick={openSignUp}>
                  Sign Up!
               </Button>
            </span>
         </div>
      </form>
   )
}

export default LoginForm
