import { useCallback, useState } from "react"
import { AccountModal, MainPage } from "./components"
import LoginContext from "./context/LoginContext"

function App() {
   const [accountOpen, setAccountOpen] = useState(false)
   const [listOpen, setListOpen] = useState(false)

   return (
      <LoginContext>
         <MainPage
            openAccount={useCallback(() => {
               setAccountOpen(true)
            }, [setAccountOpen])}
            openList={() => setListOpen(true)}
         />
         <AccountModal
            open={accountOpen}
            onClose={useCallback(() => setAccountOpen(false), [setAccountOpen])}
         />
      </LoginContext>
   )
}

export default App
