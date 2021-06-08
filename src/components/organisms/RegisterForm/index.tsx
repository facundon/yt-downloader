import { useEffect } from "react"
import {
   SubmitHandler,
   useForm,
   UseFormProps,
   RegisterOptions,
} from "react-hook-form"
import { useUser } from "../../../hooks"
import { Button, Input } from "../../atoms"
import { EMAIL_REGEX } from "../LoginForm"

import "./index.scss"

type RegisterFormProps = {
   openLogin: () => void
}
type FormValues = {
   name: string
   email: string
   password: string
   repPassword: string
}

const defaultValues: FormValues = {
   name: "",
   email: "",
   password: "",
   repPassword: "",
}

const validationMap: Record<keyof FormValues, RegisterOptions> = {
   name: {
      required: { value: true, message: "Please enter your name" },
   },
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
      minLength: {
         value: 3,
         message: "Password must be at least 3 characters",
      },
   },
   repPassword: {
      required: {
         value: true,
         message: "Please repeat the password",
      },
   },
}

const USE_FORM_CONFIG: UseFormProps<FormValues> = {
   mode: "onTouched",
   defaultValues,
}

const RegisterForm: React.FC<RegisterFormProps> = ({ openLogin }) => {
   const {
      register,
      handleSubmit,
      setError,
      setFocus,
      watch,
      formState: { errors, dirtyFields, isSubmitting },
   } = useForm<FormValues>(USE_FORM_CONFIG)
   const { register: registerUser, error } = useUser()

   const watchPassword = watch("password")

   useEffect(() => {
      if (error) {
         setError("email", { message: error })
         setFocus("email")
      }
   }, [error, setError, setFocus])

   const onSubmit: SubmitHandler<FormValues> = async values => {
      if (values.password === values.repPassword) {
         const success = await registerUser(values)
         if (success) openLogin()
      } else {
      }
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <h2>Sign Up</h2>
         <div className="login-wrapper register">
            <Input
               icon="person"
               placeholder="Name"
               type="text"
               autoFocus
               {...register("name", validationMap.name)}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
            <Input
               icon="alternate_email"
               placeholder="Email"
               type="email"
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
            <Input
               icon="vpn_key"
               placeholder="Repeat Password"
               type="password"
               {...register("repPassword", {
                  ...validationMap.repPassword,
                  validate: val =>
                     val === watchPassword || "Passwords don't match",
               })}
            />
            {errors.repPassword && (
               <p className="error">{errors.repPassword.message}</p>
            )}
            <Button
               icon="how_to_reg"
               appareance="secondary"
               type="submit"
               disabled={
                  Object.keys(errors).length !== 0 ||
                  Object.values(dirtyFields).length !== 4
               }
               loading={isSubmitting}
            >
               Sign Up!
            </Button>
            <span className="switch">
               Already have an account?{" "}
               <Button appareance="link" onClick={openLogin}>
                  Log In!
               </Button>
            </span>
         </div>
      </form>
   )
}

export default RegisterForm
