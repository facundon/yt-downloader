import { DetailedHTMLProps, FocusEvent, InputHTMLAttributes } from "react"
import "./index.scss"

interface InputProps
   extends DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
   > {
   loading?: boolean
   fontSize?: "sm" | "md"
   icon?: string
}

const Input: React.FC<InputProps> = ({
   onChange,
   icon,
   loading = false,
   fontSize = "sm",
   ...props
}) => {
   const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
      e.target.parentElement?.toggleAttribute("focus")
   }
   return (
      <div className={`input__wrapper ${loading && "loading"} ${fontSize}`}>
         {icon && <span className="material-icons-round">{icon}</span>}
         <input
            onChange={e => onChange && onChange(e)}
            onFocus={handleFocus}
            onBlur={handleFocus}
            {...props}
         />
      </div>
   )
}

export default Input
