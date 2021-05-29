import { SubmitHandler, useForm, UseFormProps } from "react-hook-form"
import axios from "axios"

import { Input, Button } from "../../atoms"
import Google from "../../../icons/google.svg"
import Facebook from "../../../icons/facebook.svg"

import "./index.scss"

const EMAIL_REGEX =
   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

type LoginFormProps = {
   openSignUp: () => void
   close: () => void
}
type FormValues = {
   email: string
   password: string
}

const defaultValues = {
   email: "",
   password: "",
}

const USE_FORM_CONFIG: UseFormProps<FormValues> = {
   mode: "onTouched",
}
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const LoginForm: React.FC<LoginFormProps> = ({ openSignUp, close }) => {
   const {
      register,
      handleSubmit,
      setError,
      formState: { errors, dirtyFields, isSubmitting },
   } = useForm<FormValues>(USE_FORM_CONFIG)

   const onSubmit: SubmitHandler<FormValues> = async (values, e) => {
      try {
         await sleep(2000)
         await axios.post("http://localhost:5000/login", values, {
            withCredentials: true,
         })
         close()
      } catch (err) {
         setError("password", { message: "Wrong password" })
      }
   }

   return (
      <>
         <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Log In</h2>
            <div className="login-wrapper">
               <Input
                  defaultValue={defaultValues.email}
                  icon="alternate_email"
                  placeholder="Email"
                  type="email"
                  autoFocus
                  {...register("email", {
                     required: {
                        value: true,
                        message: "Please enter an email",
                     },
                     pattern: {
                        value: EMAIL_REGEX,
                        message: "Invalid email address",
                     },
                  })}
               />
               {errors.email && <p className="error">{errors.email.message}</p>}
               <Input
                  defaultValue={defaultValues.password}
                  icon="vpn_key"
                  placeholder="Password"
                  type="password"
                  {...register("password", {
                     required: {
                        value: true,
                        message: "Please enter a password",
                     },
                  })}
               />
               {errors.password && (
                  <p className="error">{errors.password.message}</p>
               )}
               <Button appareance="link" type="button">
                  Forgot Password?
               </Button>
               <Button
                  icon="login"
                  appareance="secondary"
                  type="submit"
                  disabled={
                     Object.keys(errors).length !== 0 || !dirtyFields.password
                  }
                  loading={isSubmitting}
               >
                  Login
               </Button>
               <p>Or log in using</p>
               <div className="social-media">
                  <a href="#">
                     <img src={Google} alt="Sign in with google" />
                  </a>
                  <a
                     href="#"
                     onClick={async () => {
                        const res = await axios.get(
                           "http://localhost:5000/api/converter"
                        )
                        console.log(res)
                     }}
                  >
                     <img src={Facebook} alt="Sign in with facebook" />
                  </a>
               </div>
               <span>
                  Dont have an account?{" "}
                  <Button appareance="link" onClick={openSignUp} type="button">
                     Sign Up!
                  </Button>
               </span>
            </div>
         </form>
      </>
   )
}

export default LoginForm
