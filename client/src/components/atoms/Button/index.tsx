import { ButtonHTMLAttributes } from "react"
import "./index.scss"

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   icon?: string
   appareance?: "primary" | "secondary" | "subtle" | "minimalist"
   circle?: boolean
   iconColor?: string
   size?: "sm" | "md"
}

const Button = ({
   children,
   icon,
   iconColor,
   appareance = "primary",
   size = "sm",
   circle = false,
   ...props
}: BtnProps) => {
   return (
      <div
         className={`btn-wrapper ${appareance} ${size} ${circle && "circle"} ${
            children && "with-text"
         }`}
         tabIndex={0}
      >
         <button {...props} tabIndex={-1}>
            {icon && (
               <span
                  className={`material-icons-round ${size}`}
                  style={{ color: iconColor }}
               >
                  {icon}
               </span>
            )}
            {children}
         </button>
      </div>
   )
}

export default Button
