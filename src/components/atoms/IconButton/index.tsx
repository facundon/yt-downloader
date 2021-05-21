import { ButtonHTMLAttributes } from "react"
import "./index.scss"

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   icon: string
   appareance?: "primary" | "secondary" | "subtle"
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
         className={`btn-wrapper ${appareance}`}
         tabIndex={0}
         style={{
            borderRadius: circle ? "50%" : "",
            width: size === "sm" ? "35px" : "50px",
            height: size === "sm" ? "35px" : "48px",
         }}
      >
         <button {...props}>
            <span
               className="material-icons-round"
               style={{
                  color: iconColor || "",
                  fontSize: size === "sm" ? "1.6em" : "2.5em",
               }}
            >
               {icon}
            </span>
         </button>
      </div>
   )
}

export default IconButton
