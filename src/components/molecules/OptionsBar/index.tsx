import { IconButton } from "../../atoms"
import "./index.scss"

type OptionsBarProps = {
   setIsLoginOpen: (val: boolean) => void
}

const OptionsBar: React.FC<OptionsBarProps> = ({ setIsLoginOpen }) => {
   return (
      <div className="options-wrapper">
         <IconButton
            icon="person"
            appareance="minimalist"
            onClick={() => setIsLoginOpen(true)}
         />
         <IconButton icon="queue_music" appareance="minimalist" />
      </div>
   )
}

export default OptionsBar
