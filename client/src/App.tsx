import { useState } from "react"
import { AccountModal, MainPage } from "./components"

function App() {
   const [accountOpen, setAccountOpen] = useState(false)
   const [listOpen, setListOpen] = useState(false)
   return (
      <>
         <MainPage
            openAccount={() => setAccountOpen(true)}
            openList={() => setListOpen(true)}
         />
         <AccountModal
            open={accountOpen}
            onClose={() => setAccountOpen(false)}
         />
      </>
   )
}

export default App
