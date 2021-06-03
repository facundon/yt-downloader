import { useUser } from "../../../hooks"
import { Button } from "../../atoms"

const a = ["Un item de la lista", "otro temon", "temaiken"]

const FavList = () => {
   const { user } = useUser()
   console.log(user)
   return (
      <ul>
         {a.map(s => (
            <li>
               {s}
               <Button circle size="sm" icon="delete" />
            </li>
         ))}
      </ul>
   )
}

export default FavList
