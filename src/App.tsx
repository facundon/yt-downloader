import { useState } from "react"
import { AccountModal, MainPage } from "./components"
import LoginContext from "./context/LoginContext"

function App() {
   const [accountOpen, setAccountOpen] = useState(false)
   const [listOpen, setListOpen] = useState(false)
   return (
      <LoginContext>
         <MainPage
            openAccount={() => setAccountOpen(true)}
            openList={() => setListOpen(true)}
         />
         <AccountModal
            open={accountOpen}
            onClose={() => setAccountOpen(false)}
         />
      </LoginContext>
   )
}

export default App
