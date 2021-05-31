import React, { useState, createContext, useMemo } from "react"
import { User } from "../types/server"

type UserContextType = {
   user: User | null
   setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const UserContext = createContext<Partial<UserContextType>>({})

const LoginContext: React.FC = ({ children }) => {
   const [user, setUser] = useState<User | null>(() => {
      const result = localStorage.getItem("user")
      if (result) {
         return JSON.parse(result) as User
      }
      return null
   })
   const providerUser = useMemo(() => ({ user, setUser }), [user, setUser])

   return (
      <UserContext.Provider value={providerUser}>
         {children}
      </UserContext.Provider>
   )
}

export default LoginContext
