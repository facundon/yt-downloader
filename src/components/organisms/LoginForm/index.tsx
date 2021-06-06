import { useEffect } from "react"
import {
   RegisterOptions,
   SubmitHandler,
   useForm,
   UseFormProps,
} from "react-hook-form"

import { useUser } from "../../../hooks"
import { Input, Button } from "../../atoms"
import Google from "../../../icons/google.svg"
import Facebook from "../../../icons/facebook.svg"

import "./index.scss"

export const EMAIL_REGEX =
   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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

const validationMap: Record<keyof FormValues, RegisterOptions> = {
   email: {
      required: {
         value: true,
         message: "Please enter your email",
      },
      pattern: {
         value: EMAIL_REGEX,
         message: "Invalid email address",
      },
   },
   password: {
      required: {
         value: true,
         message: "Please enter a password",
      },
   },
}

const USE_FORM_CONFIG: UseFormProps<FormValues> = {
   mode: "onTouched",
   defaultValues,
}

const LoginForm: React.FC<LoginFormProps> = ({ openSignUp, close }) => {
   const {
      register,
      handleSubmit,
      setError,
      setFocus,
      formState: { errors, dirtyFields, isSubmitting },
   } = useForm<FormValues>(USE_FORM_CONFIG)
   const { login, error } = useUser()

   useEffect(() => {
      if (error) {
         setError("password", { message: error })
         setFocus("password")
      }
   }, [error, setError, setFocus])

   const onSubmit: SubmitHandler<FormValues> = async (values, e) => {
      const success = await login(values)
      if (success) close()
   }

   return (
      <>
         <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Log In</h2>
            <div className="login-wrapper">
               <Input
                  icon="alternate_email"
                  placeholder="Email"
                  type="email"
                  autoFocus
                  {...register("email", validationMap.email)}
               />
               {errors.email && <p className="error">{errors.email.message}</p>}
               <Input
                  icon="vpn_key"
                  placeholder="Password"
                  type="password"
                  {...register("password", validationMap.password)}
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
                     Object.keys(errors).length !== 0 ||
                     Object.keys(dirtyFields).length !== 2
                  }
                  loading={isSubmitting}
               >
                  Login
               </Button>
               <p>Or log in using</p>
               <div className="social-media">
                  <a href={`${process.env.REACT_APP_BACKEND_API}/login/google`}>
                     <img src={Google} alt="Sign in with google" />
                  </a>
                  <a
                     href={`${process.env.REACT_APP_BACKEND_API}/login/facebook`}
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
