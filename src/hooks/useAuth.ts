import { useCallback, useContext, useState } from "react"
import { authRequest } from "../services"
import { UserContext } from "../context/LoginContext"

function useAuth() {
   const { user, setUser } = useContext(UserContext)
   const [state, setState] = useState({ loading: false, error: "" })

   const login = useCallback(
      async (data: {}) => {
         try {
            setState({ loading: true, error: "" })
            const response = await authRequest("login", data)
            if (response) {
               setUser!(response)
               localStorage.setItem("user", JSON.stringify(response))
               setState(prev => ({ loading: false, error: prev.error }))
            }
            return true
         } catch (err) {
            setState({
               loading: false,
               error: err.message || "Wrong user or password",
            })
            return false
         }
      },
      [setUser, setState, authRequest]
   )

   const logout = useCallback(async () => {
      try {
         setState({ loading: true, error: "" })
         await authRequest("logout")
         setUser!(null)
         localStorage.removeItem("user")
         setState(prev => ({ loading: false, error: prev.error }))
      } catch (err) {
         setState({ loading: false, error: err.message })
      }
   }, [setUser, setState, authRequest])

   const register = useCallback(
      async (data: {}) => {
         try {
            setState({ loading: true, error: "" })
            await authRequest("register", data)
            setState(prev => ({ loading: false, error: prev.error }))
            return true
         } catch (err) {
            setState({ loading: false, error: err.message })
            return false
         }
      },
      [setState, authRequest]
   )

   return { user, login, logout, register, ...state }
}

export default useAuth
