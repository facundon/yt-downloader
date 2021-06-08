import { useEffect, useState } from "react"
import {
   RegisterOptions,
   SubmitHandler,
   useForm,
   UseFormProps,
} from "react-hook-form"

import { useUser } from "../../../hooks"
import { Input, Button, Loader } from "../../atoms"

import "./index.scss"

export const EMAIL_REGEX =
   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

type LoginFormProps = {
   openSignUp: () => void
   close: () => void
   open: boolean
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

const LoginForm: React.FC<LoginFormProps> = ({ openSignUp, close, open }) => {
   const {
      register,
      handleSubmit,
      setError,
      setFocus,
      formState: { errors, dirtyFields, isSubmitting },
   } = useForm<FormValues>(USE_FORM_CONFIG)
   const { user, login, error } = useUser()
   const [renderingButton, setRenderingButton] = useState(true)

   useEffect(() => {
      let mounted = true
      FB.Event.subscribe("auth.login", async res => {
         if (res.status === "connected" && !user && mounted) {
            const success = await login(
               { access_token: res.authResponse.accessToken },
               "facebook"
            )
            if (success) close()
         }
      })
      return () => {
         FB.Event.unsubscribe("auth.login", () => {})
         mounted = false
      }
   }, [login, close, user])

   useEffect(() => {
      if (open) {
         setTimeout(() => {
            FB.XFBML.parse(
               document.getElementsByClassName("login-wrapper")[0],
               () => setRenderingButton(false)
            )
         }, 0)
      }
   }, [open])

   useEffect(() => {
      if (error && error.includes("password")) {
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
               <div className="facebook-login-wrapper">
                  {renderingButton && <Loader height="50px" />}
                  <div
                     className="fb-login-button"
                     data-width="352"
                     data-size="large"
                     data-button-type="continue_with"
                     data-layout="default"
                     data-auto-logout-link="false"
                     data-use-continue-as="true"
                     data-scope="email"
                  ></div>
               </div>
               {error.includes("email") && (
                  <p style={{ alignSelf: "center" }} className="error">
                     {error}
                  </p>
               )}
               <span className="switch">
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
