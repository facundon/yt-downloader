import { MouseEvent } from "react"
import { useAuth } from "../../../hooks"
import { Button } from "../../atoms"
import "./index.scss"

type OptionsBarProps = {
   openAccount: (e: MouseEvent<HTMLButtonElement>) => void
   openList: (e: MouseEvent<HTMLButtonElement>) => void
}

const OptionsBar: React.FC<OptionsBarProps> = ({ openAccount, openList }) => {
   const { user } = useAuth()
   console.log(user)

   return (
      <div className="options-wrapper">
         <Button icon="person" appareance="minimalist" onClick={openAccount} />
         <Button
            icon="queue_music"
            appareance="minimalist"
            onClick={openList}
         />
      </div>
   )
}

export default OptionsBar
