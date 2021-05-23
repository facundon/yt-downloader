import { ButtonHTMLAttributes } from "react"
import "./index.scss"

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   icon: string
   appareance?: "primary" | "secondary" | "subtle" | "minimalist"
   circle?: boolean
   iconColor?: string
   size?: "sm" | "md"
}

const IconButton = ({
   icon,
   iconColor,
   appareance = "primary",
   size = "sm",
   circle = false,
   ...props
}: BtnProps) => {
   return (
      <div
         className={`btn-wrapper ${appareance} ${size} ${circle && "circle"}`}
         tabIndex={0}
      >
         <button {...props}>
            <span
               className={`material-icons-round ${size}`}
               style={{ color: iconColor }}
            >
               {icon}
            </span>
         </button>
      </div>
   )
}

export default IconButton
