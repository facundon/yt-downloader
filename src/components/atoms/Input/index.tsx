import { InputHTMLAttributes } from "react"
import "./index.scss"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ onChange, ...props }) => {
   return (
      <div className="input__wrapper">
         <input onChange={(e) => onChange && onChange(e)} {...props} />
      </div>
   )
}

export default Input
