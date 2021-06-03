import { useCallback, useState } from "react"
import { AccountModal, MainPage } from "./components"
import { FavModal } from "./components/pages"
import LoginContext from "./context/LoginContext"

function App() {
   const [accountOpen, setAccountOpen] = useState(false)
   const [favListOpen, setFavListOpen] = useState(false)

   return (
      <LoginContext>
         <MainPage
            openAccount={useCallback(() => {
               setAccountOpen(true)
            }, [setAccountOpen])}
            openList={() => setFavListOpen(true)}
         />
         <AccountModal
            open={accountOpen}
            onClose={useCallback(() => setAccountOpen(false), [setAccountOpen])}
         />
         <FavModal
            open={favListOpen}
            onClose={useCallback(() => setFavListOpen(false), [setFavListOpen])}
         />
      </LoginContext>
   )
}

export default App
