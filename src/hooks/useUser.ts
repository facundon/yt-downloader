import { useCallback, useContext, useState } from "react"
import { apiRequest } from "../services"
import { UserContext } from "../context/LoginContext"
import { User } from "../types/server"

function useUser() {
   const { user, setUser } = useContext(UserContext)
   const [state, setState] = useState({ loading: false, error: "" })

   const updateUserContext = (fields: Partial<User>) => {
      setUser!(prev => ({ ...prev!, ...fields }))
   }

   const login = useCallback(
      async (data: {}) => {
         try {
            setState({ loading: true, error: "" })
            const response: User = await apiRequest("post", "/login", data)
            setUser!(response)
            localStorage.setItem("user", JSON.stringify(response))
            setState(prev => ({ loading: false, error: prev.error }))
            return true
         } catch (err) {
            setState({
               loading: false,
               error: err.message || "Wrong user or password",
            })
            return false
         }
      },
      [setUser, setState]
   )

   const logout = useCallback(async () => {
      try {
         setState({ loading: true, error: "" })
         await apiRequest("put", "/logout")
         setUser!(null)
         localStorage.removeItem("user")
         setState(prev => ({ loading: false, error: prev.error }))
      } catch (err) {
         setState({
            loading: false,
            error: err.message || "Error while loging out",
         })
      }
   }, [setUser, setState])

   const register = useCallback(
      async (data: {}) => {
         try {
            setState({ loading: true, error: "" })
            await apiRequest("post", "/register", data)
            setState(prev => ({ loading: false, error: prev.error }))
            return true
         } catch (err) {
            setState({
               loading: false,
               error: err.message || "Error in register",
            })
            return false
         }
      },
      [setState]
   )

   const getUser = useCallback(async () => {
      try {
         setState({ loading: true, error: "" })
         const response = await apiRequest("get", "/user")
         setUser!(response)
         localStorage.setItem("user", JSON.stringify(response))
         setState(prev => ({ loading: false, error: prev.error }))
         return response
      } catch (err) {
         setState({
            loading: false,
            error: err.message || "Error in register",
         })
         return false
      }
   }, [setState, setUser])

   return {
      user,
      updateUserContext,
      getUser,
      login,
      logout,
      register,
      ...state,
   }
}

export default useUser
