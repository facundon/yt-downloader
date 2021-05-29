import { useForm } from "react-hook-form"
import { Button, Input } from "../../atoms"

import "./index.scss"

type RegisterFormProps = {
   openLogin: () => void
   close: () => void
}
type FormValues = {
   name: string
   email: string
   password: string
   repPassword: string
}

const RegisterForm: React.FC<RegisterFormProps> = ({ openLogin, close }) => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<FormValues>()

   const onSubmit = (values: FormValues) => {}
   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <h2>Sign Up</h2>
         <div className="login-wrapper register">
            <Input
               icon="person"
               placeholder="Name"
               type="text"
               {...register("name", { required: true })}
               autoFocus
            />
            {errors.name && (
               <p className="input-error">{errors.name.message}</p>
            )}
            <Input
               icon="alternate_email"
               placeholder="Email"
               type="email"
               {...register("email", { required: true })}
            />
            {errors.email && (
               <p className="input-error">{errors.email.message}</p>
            )}
            <Input
               icon="vpn_key"
               placeholder="Password"
               type="password"
               {...register("password", { required: true })}
            />
            {errors.password && (
               <p className="input-error">{errors.password.message}</p>
            )}
            <Input
               icon="vpn_key"
               placeholder="Repeat Password"
               type="password"
               {...register("password", { required: true })}
            />
            {errors.repPassword && (
               <p className="input-error">{errors.repPassword.message}</p>
            )}
            <Button icon="how_to_reg" appareance="secondary" type="submit">
               Sign Up!
            </Button>
            <span>
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
