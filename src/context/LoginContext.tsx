import React, { useState, createContext, useMemo } from "react"
import { User } from "../types/server"

type UserContext = {
   user: User | null
   setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const UserContext = createContext<Partial<UserContext>>({})

const LoginContext: React.FC = ({ children }) => {
   const [user, setUser] = useState<User | null>(null)
   const providerUser = useMemo(() => ({ user, setUser }), [user, setUser])

   return (
      <UserContext.Provider value={providerUser}>
         {children}
      </UserContext.Provider>
   )
}

export default LoginContext
