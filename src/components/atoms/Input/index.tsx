import { InputHTMLAttributes } from "react"
import "./index.scss"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   loading?: boolean
}

const Input: React.FC<InputProps> = ({
   onChange,
   loading = false,
   ...props
}) => {
   return (
      <div className={`input__wrapper ${loading && "loading"}`}>
         <input onChange={(e) => onChange && onChange(e)} {...props} />
      </div>
   )
}

export default Input
